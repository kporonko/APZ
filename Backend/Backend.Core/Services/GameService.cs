using Backend.Core.Interfaces;
using Backend.Core.Models;
using Backend.Infrastructure.Data;
using Backend.Infrastructure.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Numerics;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Core.Services
{
    public class GameService : IGameService
    {
        private readonly ApplicationContext _context;
        private readonly IConfiguration _configuration;
        public GameService(ApplicationContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        public async Task<HttpStatusCode> AddHeartBeat(HeartBeatAddRequest game)
        {
            HeartBeat hb = new HeartBeat
            {
                Value = game.Value,
                GameId = game.GameId,
                HeartBeatDate = game.HeartBeatDate
            };

            await _context.HeartBeats.AddAsync(hb);
            await _context.SaveChangesAsync();
            
            return HttpStatusCode.OK;
        }

        public async Task<GameCreateResponse> CreateGame(GameCreateRequest gameRequest)
        {
            Game game = new Game
            {
                Description = gameRequest.Description,
                GameStartDate = gameRequest.GameStartDate,
                GameEndDate = gameRequest.GameEndDate,
                PlayerId = gameRequest.PlayerId
            };

            await _context.Games.AddAsync(game);
            await _context.SaveChangesAsync();

            var gameGet = await _context.Games.FirstOrDefaultAsync(x => x.GameStartDate == gameRequest.GameStartDate);
            var response = new GameCreateResponse
            {
                Id = game.Id,
            };
            
            return response;
        }

        public async Task<GameBaseResponse> GetGames(int playerId)
        {
            var player = await _context.Players.Include(x => x.Games).ThenInclude(x => x.HeartBeats).FirstOrDefaultAsync(x => x.Id == playerId);
            if (player == null)
                return null;

            (int badAverageInRowCount, int badRangeInRowCount) = GetGamesInTheRowStats(player);
            var gamesData = new GameBaseResponse
            {
                BadAverageInRowCount = 0,
                BadRangeInRowCount = 0,
                Games = player.Games.Select(x => new GameBaseData
                {
                    Id = x.Id,
                    GameStartDate = x.GameStartDate,
                    GameEndDate = x.GameEndDate,
                    AvgHeartBeat = (int)x.HeartBeats.Select(x => x.Value).Average()
                }).ToList()
            };
            return gamesData;
        }

        private (int badAverageInRowCount, int badRangeInRowCount) GetGamesInTheRowStats(Player player)
        {
            int badAverageInRowCount = 0;
            int badRangeInRowCount = 0;

            var age = GetAge(player.BirthDate);
            var ageSection = GetAgeSection(age);

            var minimumBeatForAge = GetMinimumBeatForAge(ageSection);
            var increaseCoef = GetIncreaseCoef(ageSection);
            var maxIncrease = GetMaxIncrease();
            var maxDeviation = GetMaxDeviation();

            var games = player.Games.OrderBy(x => x.GameStartDate).ToList();
            foreach (var game in games)
            {
                var avgValue = game.HeartBeats.Select(x => x.Value).Average();
                var isAvgGood = avgValue < minimumBeatForAge + maxDeviation * increaseCoef;

                if (!isAvgGood)
                {
                    badAverageInRowCount++;
                }

                var minimum = game.HeartBeats.Select(x => x.Value).Min();
                var maximum = game.HeartBeats.Select(x => x.Value).Max();
                var isRangeGood = maximum - minimum < maxIncrease * increaseCoef;

                if (!isRangeGood)
                {
                    badRangeInRowCount++;
                }
            }

            return (badAverageInRowCount, badRangeInRowCount);
        }

        public async Task<GameData> GetGameStats(int gameId)
        {
            var game = await _context.Games.Include(x => x.Player).Include(x => x.HeartBeats).FirstOrDefaultAsync(x => x.Id == gameId);
            if (game == null)
                return null;

            var gameData = new GameData
            {
                Id = game.Id,
                Description = game.Description,
                GameStartDate = game.GameStartDate,
                GameEndDate = game.GameEndDate,
                HeartBeats = game.HeartBeats.Select(x => new HeartBeatData
                {
                    Value = x.Value,
                    HeartBeatDate = x.HeartBeatDate
                }).ToList(),
                PlayerId = game.Player.Id,
                IsLastHeartBeatOk = GetAnalysisOfHeartBeat(game.Player, game.HeartBeats.LastOrDefault().Value)
            };

            return gameData;
        }
        public async Task<GameAnalysisData> GetGameAnalysisStats(int gameId)
        {
            var game = await _context.Games.Include(x => x.Player).Include(x => x.HeartBeats).FirstOrDefaultAsync(x => x.Id == gameId);
            if (game == null)
                return null;

            var gameData = new GameAnalysisData
            {
                Id = game.Id,
                Description = game.Description,
                GameStartDate = game.GameStartDate,
                GameEndDate = game.GameEndDate,
                HeartBeats = game.HeartBeats.Select(x => new HeartBeatData
                {
                    Value = x.Value,
                    HeartBeatDate = x.HeartBeatDate
                }).ToList(),
                PlayerId = game.Player.Id,
                Analysis = GetAnalysisOfHeartBeats(game)
            };

            return gameData;
        }

        public AnalysisData GetAnalysisOfHeartBeats(Game game)
        {
            var age = GetAge(game.Player.BirthDate);
            var ageSection = GetAgeSection(age);

            var minimumBeatForAge = GetMinimumBeatForAge(ageSection);
            var increaseCoef = GetIncreaseCoef(ageSection);
            var maxIncrease = GetMaxIncrease();
            var maxDeviation = GetMaxDeviation();

            var analysis = GetAnalysisOfGame(game, minimumBeatForAge, increaseCoef, maxIncrease, maxDeviation);

            return new AnalysisData
            {
                IsAverageGood = analysis.isAvgGood,
                IsRangeGood = analysis.isRangeGood,
                TimesLowerMinimumHeartBeat = analysis.timesLower,
                TimesMoreMaxHeartBeat = analysis.timesHigher
            };
        }

        private (bool isAvgGood, bool isRangeGood, int timesLower, int timesHigher) GetAnalysisOfGame(Game game, int minHeartBeatForAge, int increaseCoef, int maxIncrease, int maxDeviation)
        {
            var avgValue = game.HeartBeats.Select(x => x.Value).Average();
            var isAvgGood = avgValue < minHeartBeatForAge + maxDeviation * increaseCoef;

            var minimum = game.HeartBeats.Select(x => x.Value).Min();
            var maximum = game.HeartBeats.Select(x => x.Value).Max();
            var isRangeGood = maximum - minimum < maxIncrease * increaseCoef;

            var timesLower = game.HeartBeats.Count(x => x.Value < minHeartBeatForAge);

            var timesHigher = game.HeartBeats.Count(x => x.Value > minHeartBeatForAge + maxIncrease * increaseCoef);

            return (isAvgGood, isRangeGood, timesLower, timesHigher);
        }

        private int GetAge(DateTime birthDate)
        {
            var age = DateTime.Now.Subtract(birthDate);
            return (int)(age.TotalDays / 365.25);
        }

        private string GetAgeSection(int age)
        {
            if (age < 14)
                return "Under-14";
            else if (age <= 18)
                return "14-18";
            else if (age < 40)
                return "19-40";
            else if (age < 60)
                return "41-60";
            else
                return "Over-60";
        }

        private int GetMinimumBeatForAge(string ageSection)
        {
            return Convert.ToInt32(_configuration.GetSection($"HeartBeat:Minimum:{ageSection}").Value);
        }

        private int GetIncreaseCoef(string ageSection)
        {
            return Convert.ToInt32(_configuration.GetSection($"HeartBeat:IncreasingCoef:{ageSection}").Value);
        }

        private int GetMaxIncrease()
        {
            return Convert.ToInt32(_configuration.GetSection($"HeartBeat:MaximumIncrease").Value);
        }

        private int GetMaxDeviation()
        {
            return Convert.ToInt32(_configuration.GetSection($"HeartBeat:MaximumDeviation").Value);
        }

        private bool GetAnalysisOfHeartBeat(Player player, int heartBeat)
        {
            var age = GetAge(player.BirthDate);
            var ageSection = GetAgeSection(age);
            var minHeartBeatForAge = GetMinimumBeatForAge(ageSection);
            var increaseCoef = GetIncreaseCoef(ageSection);
            var maxIncrease = GetMaxIncrease();

            return heartBeat > minHeartBeatForAge && heartBeat < minHeartBeatForAge + increaseCoef * maxIncrease;
        }
    }
}

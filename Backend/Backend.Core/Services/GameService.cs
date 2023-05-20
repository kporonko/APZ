using Backend.Core.Interfaces;
using Backend.Core.Models;
using Backend.Infrastructure.Data;
using Backend.Infrastructure.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using MQTTnet;
using MQTTnet.Client;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Globalization;
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

        
        public async Task<string> EndGame(GameEndRequest gameEndRequest)
        {
            var game = await _context.Games.FirstOrDefaultAsync(g => g.Id == gameEndRequest.GameId);
            if (game is null)
                return "";

            game.GameEndDate = DateTime.Now;
            await _context.SaveChangesAsync();
            return game.GameEndDate.ToString();
        }

        public async Task<HttpStatusCode> AddHeartBeat()
        {
            var mqttFactory = new MqttFactory();
            using (var mqttClient = mqttFactory.CreateMqttClient())
            {
                var mqttClientOptions = new MqttClientOptionsBuilder()
                    .WithClientId("Kyryl")
                    .WithTcpServer("bb2d044fb91b4a17b5434d6fe44f6ff7.s2.eu.hivemq.cloud")
                    .WithCredentials("Kyryl", "S6P@8xftnhkCWQN")
                    .WithTls()
                    .WithCleanSession()
                    .Build();

                var a = await mqttClient.ConnectAsync(mqttClientOptions, CancellationToken.None);

                mqttClient.ApplicationMessageReceivedAsync += e =>
                {
                    var a = System.Text.Encoding.Default.GetString(e.ApplicationMessage.Payload);
                    HeartBeatAddRequest heartbeat = JsonConvert.DeserializeObject<HeartBeatAddRequest>(a);

                    var game = _context.Games.FirstOrDefault(x => x.Id == heartbeat.GameId);
                    if (game.GameEndDate is null)
                    {
                        HeartBeat hb = new HeartBeat
                        {
                            Value = heartbeat.Value,
                            GameId = heartbeat.GameId,
                            HeartBeatDate = DateTime.Now
                        };

                        _context.HeartBeats.Add(hb);
                        _context.SaveChanges();
                    }

                    return Task.CompletedTask;
                };
                
                var mqttSubscribeOptions = mqttFactory.CreateSubscribeOptionsBuilder()
                    .WithTopicFilter(
                        f =>
                        {
                            f.WithTopic("heartbeat");
                        })
                    .Build();

                var b = await mqttClient.SubscribeAsync(mqttSubscribeOptions);


                Console.WriteLine("Add heartbeat start.");


                Console.ReadLine();
                Console.WriteLine("Add heartbeat stop.");
                return HttpStatusCode.OK;
            }
        }

        public async Task<GameCreateResponse> CreateGame(GameCreateRequest gameRequest)
        {
            var date = DateTime.Now;
            Game game = new Game
            {
                Description = "", 
                GameStartDate = date,
                PlayerId = gameRequest.PlayerId,
                SensorId = gameRequest.SensorId
            };

            await _context.Games.AddAsync(game);
            await _context.SaveChangesAsync();

            var gameGet = await _context.Games.FirstOrDefaultAsync(x => x.GameStartDate == date);
            var response = new GameCreateResponse
            {
                Id = game.Id,
            };
            
            return response;
        }

        public async Task<GameBaseResponse> GetGames(int playerId)
        {
            //var player = await _context.Players.Include(x => x.Games).ThenInclude(x => x.HeartBeats).FirstOrDefaultAsync(x => x.Id == playerId);

            var player = await _context.Players.FirstOrDefaultAsync(x => x.Id == playerId);

            if (player != null)
            {
                 _context.Entry(player)
                    .Collection(x => x.Games)
                    .Query()
                    .Include(x => x.HeartBeats)
                    .Load();
            }
            if (player == null)
                return null;

            (int? badAverageInRowCount, int? badRangeInRowCount) = GetGamesInTheRowStats(player);
            var gamesData = new GameBaseResponse
            {
                BadAverageInRowCount = badAverageInRowCount,
                BadRangeInRowCount = badRangeInRowCount,
                Games = player.Games.Select(x => new GameBaseData
                {
                    Id = x.Id,
                    GameStartDate = x.GameStartDate,
                    GameEndDate = x.GameEndDate,
                    AvgHeartBeat = x.HeartBeats.Count > 0 ? (int)x.HeartBeats.Select(x => x.Value).Average() : null
                }).OrderByDescending(x => x.GameStartDate).ToList()
            };
            return gamesData;
        }

        private (int? badAverageInRowCount, int? badRangeInRowCount) GetGamesInTheRowStats(Player player)
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
                if (game.HeartBeats.Count == 0)
                {
                    return (null, null);
                }
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
            //var game = await _context.Games.Include(x => x.Player).Include(x => x.HeartBeats).FirstOrDefaultAsync(x => x.Id == gameId);

            var game = await _context.Games.FirstOrDefaultAsync(x => x.Id == gameId);

            if (game != null)
            {
                 _context.Entry(game)
                    .Reference(x => x.Player)
                    .Load();

                 _context.Entry(game)
                    .Collection(x => x.HeartBeats)
                    .Load();
            }

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
                }).TakeLast(10).ToList(),
                PlayerId = game.Player.Id,
                IsLastHeartBeatOk = game.HeartBeats.Count == 0 ? true : GetAnalysisOfHeartBeat(game.Player, game.HeartBeats.LastOrDefault().Value),
                SensorId = game.SensorId
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
                Analysis = GetAnalysisOfHeartBeats(game),
                SensorId = game.SensorId
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
                IsAverageHigher = analysis.isAvgHigher,
                IsAverageLower= analysis.isAvgLower,
                IsRangeGood = analysis.isRangeGood,
                TimesLowerMinimumHeartBeat = analysis.timesLower,
                TimesMoreMaxHeartBeat = analysis.timesHigher
            };
        }

        private (bool isAvgHigher, bool isAvgLower, bool isRangeGood, int timesLower, int timesHigher) GetAnalysisOfGame(Game game, int minHeartBeatForAge, double increaseCoef, int maxIncrease, int maxDeviation)
        {
            var avgValue = game.HeartBeats.Select(x => x.Value).Average();

            var maxValue = minHeartBeatForAge + maxIncrease * increaseCoef;
            var isAvgHigher = avgValue > (minHeartBeatForAge + maxValue) / 2 + maxDeviation * increaseCoef;
            var isAvgLower = avgValue < (minHeartBeatForAge + maxValue) / 2 - maxDeviation * increaseCoef;

            var minimum = game.HeartBeats.Select(x => x.Value).Min();
            var maximum = game.HeartBeats.Select(x => x.Value).Max();
            var isRangeGood = maximum - minimum < maxDeviation * increaseCoef;

            var timesLower = game.HeartBeats.Count(x => x.Value < minHeartBeatForAge);

            var timesHigher = game.HeartBeats.Count(x => x.Value > minHeartBeatForAge + maxIncrease * increaseCoef);

            return (isAvgHigher, isAvgLower, isRangeGood, timesLower, timesHigher);
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
        
        private double GetIncreaseCoef(string ageSection)
        {
            var a = _configuration.GetSection($"HeartBeat:IncreasingCoef:{ageSection}").Value;
            return Convert.ToDouble(_configuration.GetSection($"HeartBeat:IncreasingCoef:{ageSection}").Value, CultureInfo.InvariantCulture);
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

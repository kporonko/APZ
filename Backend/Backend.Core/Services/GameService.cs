using Backend.Core.Interfaces;
using Backend.Core.Models;
using Backend.Infrastructure.Data;
using Backend.Infrastructure.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Core.Services
{
    public class GameService : IGameService
    {
        private readonly ApplicationContext _context;
        public GameService(ApplicationContext context)
        {
            _context = context;
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
                Id = gameGet.Id,
            };
            
            return response;
        }

        public async Task<List<GameBaseData>> GetGames(int playerId)
        {
            var player = await _context.Players.Include(x => x.Games).FirstOrDefaultAsync(x => x.Id == playerId);
            if (player == null)
                return null;

            var gamesData = player.Games.Select(x => new GameBaseData
            {
                Id = x.Id,
                GameStartDate = x.GameStartDate,
                GameEndDate = x.GameEndDate,
                AvgHeartBeat = (int)x.HeartBeats.Select(x => x.Value).Average()
            }).ToList();

            return gamesData;
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
                PlayerId = game.Player.Id
            };

            return gameData;
        }
    }
}

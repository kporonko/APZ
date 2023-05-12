using Backend.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Core.Interfaces
{
    public interface IGameService
    {
        public Task<GameCreateResponse> CreateGame(GameCreateRequest game);
        public Task<HttpStatusCode> AddHeartBeat();
        public Task<GameData> GetGameStats(int gameId);
        public Task<GameAnalysisData> GetGameAnalysisStats(int gameId);
        public Task<GameBaseResponse> GetGames(int playerId);
    }
}

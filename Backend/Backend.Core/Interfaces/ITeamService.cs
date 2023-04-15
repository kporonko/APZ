using Backend.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Core.Interfaces
{
    public interface ITeamService
    {
        Task<TeamBaseResponse> GetTeam(int managerId);
        Task<HttpStatusCode> CreateTeam(CreateTeamRequest team, int managerId);
        Task<HttpStatusCode> UpdateTeam(CreateTeamRequest team, int managerId);
        Task<HttpStatusCode> DeleteTeam(int managerId);
        Task<HttpStatusCode> AddPlayerToTeam(int managerId, PlayerAddRequest playerAdd);
        Task<HttpStatusCode> RemovePlayerFromTeam(int managerId, int playerId);
        Task<HttpStatusCode> UpdatePlayer(int managerId, PlayerUpdateRequest playerUpdate);
        Task<List<PlayerShortResponse>?> GetPlayers(int managerId);
        Task<PlayerResponse?> GetPlayer(int managerId, int playerId);
        Task<PlayerResponse?> GetPlayer(int playerId);
    }
}

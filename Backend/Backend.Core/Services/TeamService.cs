using Backend.Core.Extensions;
using Backend.Core.Interfaces;
using Backend.Core.Models;
using Backend.Infrastructure.Data;
using Backend.Infrastructure.Models;
using Microsoft.EntityFrameworkCore;
using System.Net;

namespace Backend.Core.Services
{
    public class TeamService : ITeamService
    {
        private readonly ApplicationContext _context;
        public TeamService(ApplicationContext context)
        {
            _context = context;
        }

        public async Task<HttpStatusCode> AddPlayerToTeam(int managerId, PlayerAddRequest playerAdd)
        {
            var coach = await _context.Managers.Include(c => c.Team).FirstOrDefaultAsync(c => c.Id == managerId);

            if (coach == null)
                return HttpStatusCode.NotFound;

            var player = new Player
            {
                FirstName = playerAdd.FirstName,
                LastName = playerAdd.LastName,
                Avatar = playerAdd.Avatar,
                Team = coach.Team,
                TeamId = coach.Team.Id,
                BirthDate = playerAdd.BirthDate,
                Login = playerAdd.Login,
                Password = playerAdd.Password.ConvertPasswordToHash(),
                Role = Role.Player
            };

            await _context.Players.AddAsync(player);
            await _context.SaveChangesAsync();
            return HttpStatusCode.OK;
        }

        public async Task<HttpStatusCode> CreateTeam(CreateTeamRequest team, int managerId)
        {
            var manager = await _context.Managers.FirstOrDefaultAsync(x => x.Id == managerId);
            _context.Entry(manager).Reference(x => x.Team).Load();

            if (manager.Team is not null)
                return HttpStatusCode.Conflict;

            Team teamResult = new Team
            {
                Description = team.Description,
                Image = team.Image,
                Name = team.Name,
                ManagerId = managerId
            };

            await _context.Teams.AddAsync(teamResult);
            await _context.SaveChangesAsync();
            return HttpStatusCode.OK;
        }

        public async Task<HttpStatusCode> DeleteTeam(int managerId)
        {
            var team = await _context.Teams.FirstOrDefaultAsync(x => x.ManagerId == managerId);
            if (team == null)
                return HttpStatusCode.NotFound;

            _context.Teams.Remove(team);
            await _context.SaveChangesAsync();
            return HttpStatusCode.OK;
        }
        
        public async Task<PlayerResponse?> GetPlayer(int managerId, int playerId)
        {
            var team = await _context.Teams.FirstOrDefaultAsync(x => x.ManagerId == managerId);
            var isPlayerInTeam = await _context.Players.AnyAsync(x => x.Id == playerId && x.TeamId == team.Id);

            if (team == null || !isPlayerInTeam)
                return null;

            var player = await _context.Players.FirstOrDefaultAsync(x => x.Id == playerId && x.Team.ManagerId == managerId);

            if (player == null)
                return null;
            
            _context.Entry(player).Collection(x => x.Games).Query().Include(x => x.HeartBeats).Load();

            return new PlayerResponse
            {
                Id = player.Id,
                LastName = player.LastName,
                FirstName = player.FirstName,
                Avatar = player.Avatar,
                BirthDate = player.BirthDate,
                Games = player.Games.Select(x => new GameData
                {
                    Id = x.Id,
                    Description = x.Description,
                    IsPlayerAbsent = x.IsPlayerAbsent,
                    GameStartDate = x.GameStartDate,
                    GameEndDate = x.GameEndDate,
                    HeartBeats = x.HeartBeats.Select(x => new HeartBeatData
                    {
                        Value = x.Value,
                        HeartBeatDate = x.HeartBeatDate
                    }).ToList(),
                }).ToList()
            };

        }

        public async Task<PlayerResponse?> GetPlayer(int playerId)
        {
            var player = await _context.Players.FirstOrDefaultAsync(x => x.Id == playerId);

            if (player == null)
                return null;

            _context.Entry(player).Collection(x => x.Games).Query().Include(x => x.HeartBeats).Load();

            return new PlayerResponse
            {
                Id = player.Id,
                LastName = player.LastName,
                FirstName = player.FirstName,
                Avatar = player.Avatar,
                BirthDate = player.BirthDate,
                Games = player.Games.Select(x => new GameData
                {
                    Id = x.Id,
                    Description = x.Description,
                    IsPlayerAbsent = x.IsPlayerAbsent,
                    GameStartDate = x.GameStartDate,
                    GameEndDate = x.GameEndDate,
                    HeartBeats = x.HeartBeats.Select(x => new HeartBeatData
                    {
                        Value = x.Value,
                        HeartBeatDate = x.HeartBeatDate
                    }).ToList(),
                }).ToList()
            };
        }
        
        public async Task<List<PlayerShortResponse>?> GetPlayers(int managerId)
        {
            //var team = await _context.Teams.Include(x => x.Players).ThenInclude(x => x.Games).ThenInclude(x => x.HeartBeats).FirstOrDefaultAsync(x => x.ManagerId == managerId);

            var team = await _context.Teams.FirstOrDefaultAsync(x => x.ManagerId == managerId);

            if (team != null)
            {
                _context.Entry(team)
                    .Collection(x => x.Players)
                    .Load();

                foreach (var player in team.Players)
                {
                    _context.Entry(player)
                        .Collection(x => x.Games)
                        .Query()
                        .Include(x => x.HeartBeats)
                        .Load();
                }
            }
            
            if (team == null)
                return null;

            var players = team.Players.Select(x => new PlayerShortResponse
            {
                Id = x.Id,
                FirstName = x.FirstName,
                LastName = x.LastName,
                Avatar = x.Avatar,
                AvgHeartBeatLastGame = GetAvgHeartBeatLastGame(x)
            }).ToList();

            return players;
        }

        private int? GetAvgHeartBeatLastGame(Player x)
        {
            if (x.Games == null || x.Games.Count == 0)
            {
                return null;
            }

            var game = x.Games.Last();
            var heartBeats = game.HeartBeats;
            var values = heartBeats.Select(x => x.Value).ToList();
            double? average = values.Count > 0 ? values.Average() : null;
            int? result = average is not null ? (int)average : null;
            return result;
        }

        public async Task<TeamBaseResponse> GetTeam(int managerId)
        {
            var team = await _context.Teams.FirstOrDefaultAsync(x => x.ManagerId == managerId);
            if (team == null)
                return null;

            return new TeamBaseResponse
            {
                Description = team.Description,
                Id = team.Id,
                Image = team.Image,
                Name = team.Name
            };
        }

        public async Task<HttpStatusCode> RemovePlayerFromTeam(int managerId, int playerId)
        {
            var player = await _context.Players.FirstOrDefaultAsync(x => x.Id == playerId && x.Team.ManagerId == managerId);
            var games = _context.Games.Where(x => x.PlayerId == player.Id).ToList();
            if (games.Any())
            {
                foreach (var game in games)
                {
                    var heartBeats = _context.HeartBeats.Where(x => x.GameId == game.Id);
                    _context.HeartBeats.RemoveRange(heartBeats);
                }
            }
            _context.Games.RemoveRange(games);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception)
            {

                throw;
            }

            _context.Players.Remove(player);
            await _context.SaveChangesAsync();
            return HttpStatusCode.OK;
        }

        public async Task<HttpStatusCode> UpdatePlayer(int managerId, PlayerUpdateRequest playerUpdate)
        {
            var player = await _context.Players.FirstOrDefaultAsync(x => x.Id == playerUpdate.Id && x.Team.ManagerId == managerId);
            if (player == null)
                return HttpStatusCode.NotFound;

            player.FirstName = playerUpdate.FirstName;
            player.LastName = playerUpdate.LastName;
            player.Avatar = playerUpdate.Avatar;

            await _context.SaveChangesAsync();
            return HttpStatusCode.OK;
        }

        public async Task<HttpStatusCode> UpdateTeam(CreateTeamRequest createTeamRequest, int managerId)
        {
            var team = await _context.Teams.FirstOrDefaultAsync(x => x.ManagerId == managerId);
            
            if (team == null)
                return HttpStatusCode.NotFound;

            team.Description = createTeamRequest.Description;
            team.Image = createTeamRequest.Image;
            team.Name = createTeamRequest.Name;

            _context.Teams.Update(team);
            await _context.SaveChangesAsync();
            return HttpStatusCode.OK;
        }
    }
}

using Backend.Core.Interfaces;
using Backend.Core.Models;
using Backend.Infrastructure.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Security.Claims;

namespace Backend.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GameController : ControllerBase
    {
        private readonly IGameService _gameService;
        private readonly IConfiguration _config;

        public GameController(IGameService gameService, IConfiguration config)
        {
            _gameService = gameService;
            _config = config;
        }


        [Authorize]
        [HttpGet("games/player/{playerId}")]
        public async Task<ActionResult<GameBaseData>> GetGames(int playerId)
        {
            var response = await _gameService.GetGames(playerId);
            if (response is not null)
                return Ok(response);

            return NotFound();
        }

        [Authorize]
        [HttpGet("games/player")]
        public async Task<ActionResult<GameBaseData>> GetGames()
        {
            var userFromJwt = GetCurrentUser();
            var response = await _gameService.GetGames(userFromJwt.Id);
            if (response is not null)
                return Ok(response);

            return NotFound();
        }

        [Authorize]
        [HttpPost("game")]
        public async Task<IActionResult> CreateGame(GameCreateRequest game)
        {
            var result = await _gameService.CreateGame(game);
            if (result is not null)
                return Ok(result);

            return BadRequest();
        }

        [Authorize]
        [HttpPost("heartbeat")]
        public async Task<IActionResult> AddHeartBeat(HeartBeatAddRequest request)
        {
            var res = await _gameService.AddHeartBeat(request);
            return Ok("Game is deleted");
        }

        [Authorize]
        [HttpGet("game/{id}")]
        public async Task<ActionResult<GameData>> GetGameStats(int id)
        {
            var res = await _gameService.GetGameStats(id);
            if (res is not null)
                return Ok(res);

            return BadRequest();
        }
        
        /// <summary>
        /// Gets current user by authorizing jwt token.
        /// </summary>
        /// <returns></returns>
        private Player? GetCurrentUser()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            
            if (identity is not null)
            {
                var userClaims = identity.Claims;

                return new Player
                {
                    Login = userClaims.FirstOrDefault(o => o.Type == ClaimTypes.Email)?.Value,
                    FirstName = userClaims.FirstOrDefault(o => o.Type == ClaimTypes.GivenName)?.Value,
                    LastName = userClaims.FirstOrDefault(o => o.Type == ClaimTypes.Surname)?.Value,
                    Id = Convert.ToInt32(userClaims.FirstOrDefault(o => o.Type == ClaimTypes.Sid)?.Value),
                };
            }
            return null;
        }
    }
}

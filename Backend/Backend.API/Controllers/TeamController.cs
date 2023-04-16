using Backend.Core.Interfaces;
using Backend.Core.Models;
using Backend.Infrastructure.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Security.Claims;

namespace Backend.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeamController : ControllerBase
    {
        private readonly ITeamService _teamService;
        private readonly IConfiguration _config;

        public TeamController(ITeamService teamService, IConfiguration config)
        {
            _teamService = teamService;
            _config = config;
        }

        [Authorize(Roles = "Manager")]
        [HttpGet("team")]
        public async Task<ActionResult<TeamBaseResponse>> GetTeam()
        {
            var userFromJwt = GetCurrentUser();
            var response = await _teamService.GetTeam(userFromJwt.Id);
            if (response is not null)
                return Ok(response);

            return NotFound();
        }

        [Authorize(Roles = "Manager")]
        [HttpPost("team")]
        public async Task<IActionResult> CreateTeam(CreateTeamRequest team)
        {
            var userFromJwt = GetCurrentUser();
            var codeResult = await _teamService.CreateTeam(team, userFromJwt.Id);
            if (codeResult == HttpStatusCode.Conflict)
                return Conflict("Team is used");

            return Ok("Team is created");
        }

        [Authorize(Roles = "Manager")]
        [HttpDelete("team")]
        public async Task<IActionResult> DeleteTeam()
        {
            var userFromJwt = GetCurrentUser();
            var codeResult = await _teamService.DeleteTeam(userFromJwt.Id);
            if (codeResult == HttpStatusCode.Conflict)
                return Conflict("Team is used");

            return Ok("Team is deleted");
        }

        [Authorize(Roles = "Manager")]
        [HttpPut("team")]
        public async Task<IActionResult> UpdateTeam(CreateTeamRequest teamUpdate)
        {
            var userFromJwt = GetCurrentUser();
            var codeResult = await _teamService.UpdateTeam(teamUpdate, userFromJwt.Id);
            if (codeResult == HttpStatusCode.NotFound)
                return NotFound();

            return Ok("Team is updated");
        }

        [Authorize(Roles = "Manager")]
        [HttpPost("player")]
        public async Task<IActionResult> AddPlayerToTeam(PlayerAddRequest playerAdd)
        {
            var userFromJwt = GetCurrentUser();
            var codeResult = await _teamService.AddPlayerToTeam(userFromJwt.Id, playerAdd);
            if (codeResult == HttpStatusCode.NotFound)
                return NotFound();

            return Ok("Player is added");
        }

        [Authorize(Roles = "Manager")]
        [HttpDelete("player")]
        public async Task<IActionResult> DeletePlayerFromTeam(PlayerDeleteRequest playerDeleteRequest)
        {
            var userFromJwt = GetCurrentUser();
            var codeResult = await _teamService.RemovePlayerFromTeam(userFromJwt.Id, playerDeleteRequest.PlayerId);
            if (codeResult == HttpStatusCode.NotFound)
                return NotFound();

            return Ok("Player is deleted");
        }

        [Authorize(Roles = "Manager")]
        [HttpPut("player")]
        public async Task<IActionResult> UpdatePlayer(PlayerUpdateRequest playerUpdate)
        {
            var userFromJwt = GetCurrentUser();
            var codeResult = await _teamService.UpdatePlayer(userFromJwt.Id, playerUpdate);
            if (codeResult == HttpStatusCode.NotFound)
                return NotFound();

            return Ok("Player is updated");
        }

        [Authorize(Roles = "Manager")]
        [HttpGet("players")]
        public async Task<ActionResult<List<PlayerShortResponse>>> GetPlayers()
        {
            var userFromJwt = GetCurrentUser();
            var response = await _teamService.GetPlayers(userFromJwt.Id);
            if (response is not null)
                return Ok(response);

            return NotFound();
        }

        [Authorize(Roles = "Manager")]
        [HttpGet("player/{id}")]
        public async Task<ActionResult<PlayerResponse>> GetPlayer([FromRoute] int id)
        {
            var userFromJwt = GetCurrentUser();
            var response = await _teamService.GetPlayer(userFromJwt.Id, id);
            if (response is not null)
                return Ok(response);

            return NotFound();
        }

        [Authorize(Roles = "Player")]
        [HttpGet("player")]
        public async Task<ActionResult<PlayerResponse>> GetPlayer()
        {
            var userFromJwt = GetCurrentUser();
            var response = await _teamService.GetPlayer(userFromJwt.Id);
            if (response is not null)
                return Ok(response);

            return NotFound();
        }
        
        /// <summary>
        /// Gets current user by authorizing jwt token.
        /// </summary>
        /// <returns></returns>
        private ManagerProfile? GetCurrentUser()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;

            if (identity is not null)
            {
                var userClaims = identity.Claims;

                return new ManagerProfile
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

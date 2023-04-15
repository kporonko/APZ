using Azure;
using Backend.Core.Extensions;
using Backend.Core.Interfaces;
using Backend.Core.Models;
using Backend.Infrastructure.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace Backend.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly IConfiguration _config;

        public AuthController(IAuthService authService, IConfiguration config)
        {
            _authService = authService;
            _config = config;
        }

        [HttpPost("manager/login")]
        public async Task<IActionResult> LoginManager(LoginRequest loginRequest)
        {
            if (loginRequest == null)
                return BadRequest();

            ManagerProfile? manager = await _authService.LoginManager(loginRequest);
            
            if (manager is not null)
            {
                var token = manager.GenerateToken(_config["Jwt:Key"], _config["Jwt:Issuer"], _config["Jwt:Audience"]);
                LoginResponse loginResponse = new LoginResponse() { Token = token };
                return Ok(loginResponse);
            }
            
            return NotFound();
        }

        [HttpPost("player/login")]
        public async Task<IActionResult> LoginPlayer(LoginRequest loginRequest)
        {
            if (loginRequest == null)
                return BadRequest();
            
            Player? player = await _authService.LoginPlayer(loginRequest);

            if (player is not null)
            {
                var token = player.GenerateToken(_config["Jwt:Key"], _config["Jwt:Issuer"], _config["Jwt:Audience"]);
                LoginResponse loginResponse = new LoginResponse() { Token = token };
                return Ok(loginResponse);
            }

            return NotFound();
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(ManagerRegisterRequest profile)
        {
            if (profile == null)
                return BadRequest();
            
            HttpStatusCode statusCode = await _authService.RegisterManager(profile);
            return StatusCode((int)statusCode);
        }
    }
}

using Backend.Infrastructure.Models;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Core.Extensions
{
    public static class ModelsExtensions
    {
        public static string GenerateToken(this ManagerProfile manager, string jwtKey, string issuer, string audience)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.Email, manager.Login),
                new Claim(ClaimTypes.GivenName, manager.FirstName),
                new Claim(ClaimTypes.Surname, manager.LastName),
                new Claim(ClaimTypes.Sid, manager.Id.ToString()),
                new Claim(ClaimTypes.Role, manager.Role.ToString()),
            };

            var token = new JwtSecurityToken(
                issuer,
                audience,
                claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: credentials
                );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public static string GenerateToken(this Player manager, string jwtKey, string issuer, string audience)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.Email, manager.Login),
                new Claim(ClaimTypes.GivenName, manager.FirstName),
                new Claim(ClaimTypes.Surname, manager.LastName),
                new Claim(ClaimTypes.Role, manager.Role.ToString()),
                new Claim(ClaimTypes.Sid, manager.Id.ToString()),
            };

            var token = new JwtSecurityToken(
                issuer,
                audience,
                claims,
                expires: DateTime.Now.AddMinutes(999),
                signingCredentials: credentials
                );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}

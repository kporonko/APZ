using Backend.Infrastructure.Data;
using Backend.Core.Extensions;
using Backend.Core.Interfaces;
using Backend.Core.Models;
using Backend.Infrastructure.Models;
using Microsoft.EntityFrameworkCore;
using System.Net;

namespace Backend.Core.Services
{
    public class AuthService : IAuthService
    {
        private readonly ApplicationContext _context;
        public AuthService(ApplicationContext context)
        {
            _context = context;
        }
        
        public async Task<ManagerProfile> LoginManager(LoginRequest loginRequest)
        {
            var passwordHash = loginRequest.Password.ConvertPasswordToHash();
            ManagerProfile? manager = await _context.Managers.FirstOrDefaultAsync(x => x.Login == loginRequest.Login && x.Password == passwordHash);
            return manager;
        }

        public async Task<Player> LoginPlayer(LoginRequest loginRequest)
        {
            var passwordHash = loginRequest.Password.ConvertPasswordToHash();
            Player? player = await _context.Players.FirstOrDefaultAsync(x => x.Login == loginRequest.Login && x.Password == passwordHash);
            return player;
        }

        public async Task<HttpStatusCode> RegisterManager(ManagerRegisterRequest profile)
        {
            var isEmailExists = await IsEmailExists(profile.Login);
            if (isEmailExists)
                return HttpStatusCode.Conflict;
            ManagerProfile user = ConvertRegisterToManager(profile);
            AddManagerToDb(user);
            return HttpStatusCode.Created;
        }

        private async Task<bool> IsEmailExists(string login)
        {
            ManagerProfile? user = await _context.Managers.FirstOrDefaultAsync(x => x.Login == login);
            return user != null;
        }

        private ManagerProfile ConvertRegisterToManager(ManagerRegisterRequest registerUser)
        {
            ManagerProfile user = new ManagerProfile
            {
                FirstName = registerUser.FirstName,
                LastName = registerUser.LastName,
                Login = registerUser.Login,
                Password = registerUser.Password.ConvertPasswordToHash(),
                Role = Role.Manager
            };

            user.Password = registerUser.Password.ConvertPasswordToHash();
            return user;
        }
        
        private void AddManagerToDb(ManagerProfile user)
        {
            _context.Managers.Add(user);
            _context.SaveChanges();
        }
    }
}

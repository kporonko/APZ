using Backend.Core.Models;
using Backend.Infrastructure.Models;
using System.Net;

namespace Backend.Core.Interfaces
{
    public interface IAuthService
    {
        Task<ManagerProfile> LoginManager(LoginRequest loginRequest);
        Task<Player> LoginPlayer(LoginRequest loginRequest);
        Task<HttpStatusCode> RegisterManager(ManagerRegisterRequest profile);
    }
}

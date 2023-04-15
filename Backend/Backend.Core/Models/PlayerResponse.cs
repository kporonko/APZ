using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Core.Models
{
    public class PlayerResponse
    {
        public int Id { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public string Avatar { get; set; }
        public DateTime BirthDate { get; set; }
        public List<GameData> Games { get; set; }
    }
}

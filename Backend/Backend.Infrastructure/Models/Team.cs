using System;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Infrastructure.Models
{
    public class Team
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string? Image { get; set; }
        public string Description { get; set; }
        public int CoachId { get; set; }
        public ManagerProfile ManagerProfile { get; set; }
        public List<Player> Players { get; set; }
    }
}

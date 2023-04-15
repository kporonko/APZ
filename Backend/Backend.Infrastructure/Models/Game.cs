using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Infrastructure.Models
{
    public class Game
    {
        public int Id { get; set; }
        public DateTime GameStartDate { get; set; }
        public DateTime GameEndDate { get; set; }
        public bool IsPlayerAbsent { get; set; }
        public string Description { get; set; }
        public int PlayerId { get; set; }
        public Player Player { get; set; }
        public List<HeartBeat> HeartBeats { get; set; }
    }
}

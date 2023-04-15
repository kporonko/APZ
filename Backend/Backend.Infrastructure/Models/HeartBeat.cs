using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Infrastructure.Models
{
    public class HeartBeat
    {
        public int Id { get; set; }
        public DateTime HeartBeatDate { get; set; }
        public int Value { get; set; }
        public int GameId { get; set; }
        public Game Game { get; set; }
    }
}

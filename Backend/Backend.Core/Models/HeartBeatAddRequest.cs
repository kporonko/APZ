using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Core.Models
{
    public class HeartBeatAddRequest
    {
        public int Id { get; set; }
        public DateTime HeartBeatDate { get; set; }
        public int Value { get; set; }
        public int GameId { get; set; }
    }
}

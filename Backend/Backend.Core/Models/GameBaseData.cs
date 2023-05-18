using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Core.Models
{
    public class GameBaseData
    {
        public int Id { get; set; }
        public DateTime GameStartDate { get; set; }
        public DateTime? GameEndDate { get; set; }
        public bool IsPlayerAbsent { get; set; }
        public int? AvgHeartBeat { get; set; }
    }
}

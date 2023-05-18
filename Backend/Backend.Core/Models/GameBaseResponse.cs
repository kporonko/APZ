using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Core.Models
{
    public class GameBaseResponse
    {
        public List<GameBaseData> Games { get; set; }
        public int? BadAverageInRowCount { get; set; }
        public int? BadRangeInRowCount { get; set; }
    }
}

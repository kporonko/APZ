using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Core.Models
{
    public class AnalysisData
    {
        public bool IsRangeGood { get; set; }
        public int TimesMoreMaxHeartBeat { get; set; }
        public int TimesLowerMinimumHeartBeat { get; set; }
        public bool IsAverageGood { get; set; }
    }
}

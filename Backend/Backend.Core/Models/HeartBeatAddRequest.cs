using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Core.Models
{
    public class HeartBeatAddRequest
    {
        [Required]
        public DateTime HeartBeatDate { get; set; }
        
        [Required]
        public int Value { get; set; }
        
        [Required]
        public int GameId { get; set; }
    }
}

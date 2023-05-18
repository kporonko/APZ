using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Core.Models
{
    public class GameCreateRequest
    {
        [Required]
        public DateTime GameStartDate { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public int PlayerId { get; set; }
        
        [Required]
        public string SensorId { get; set; }
    }
}

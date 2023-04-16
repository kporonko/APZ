using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Core.Models
{
    public class PlayerDeleteRequest
    {
        [Required]
        public int PlayerId { get; set; }
    }
}

using Backend.Infrastructure.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Core.Models
{
    public class PlayerAddRequest
    {
        [Required]
        public string LastName { get; set; }
        [Required]
        public string FirstName { get; set; }
        public string Avatar { get; set; }
        public DateTime BirthDate { get; set; }
        [Required]
        public string Login { get; set; }
        [Required]
        public string Password { get; set; }

    }
}

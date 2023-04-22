using Backend.Infrastructure.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Core.Models
{
    public class ManagerRegisterRequest
    {
        [Required]
        [DataType(DataType.EmailAddress)]
        public string Login { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        [MinLength(8)]
        public string Password { get; set; }
    }
}

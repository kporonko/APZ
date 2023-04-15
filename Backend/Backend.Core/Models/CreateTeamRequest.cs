using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Core.Models
{
    public class CreateTeamRequest
    {
        public string Name { get; set; }
        public string? Image { get; set; }
        public string Description { get; set; }
    }
}

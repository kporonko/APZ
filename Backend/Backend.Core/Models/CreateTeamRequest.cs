﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Core.Models
{
    public class CreateTeamRequest
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string? Image { get; set; }

        [Required]
        public string Description { get; set; }
    }
}

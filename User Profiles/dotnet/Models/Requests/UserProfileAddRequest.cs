using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace Sabio.Models.Requests
{
    public class UserProfileAddRequest
    {
        [Required(ErrorMessage = "First name is required")]
        [MinLength(1, ErrorMessage = "First name should be at least 1 characters")]
        [MaxLength(255, ErrorMessage = "First name should be at most 255 characters")]
        public string FirstName { get; set; }

        [Required(ErrorMessage = "Last name is required")]
        [MinLength(1, ErrorMessage = "Last name should be at least 1 characters")]
        [MaxLength(255, ErrorMessage = "Last name should be at most 255 characters")]
        public string LastName { get; set; }

        public string AvatarUrl { get; set; }

        public string Description { get; set; }

        public DateTime? DOB { get; set; }

        public string PhoneNumber { get; set; }
    }
}
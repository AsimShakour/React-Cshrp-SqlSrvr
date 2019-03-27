using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace Sabio.Models.Requests
{
    public class UserProfileUpdateRequest : UserProfileAddRequest
    {
        [Required(ErrorMessage = "Id is required")]
        [Range(1, Int32.MaxValue,
        ErrorMessage = "Value for Id must be between 1 and Int 32 max.")]
        public int Id { get; set; }
    }
}
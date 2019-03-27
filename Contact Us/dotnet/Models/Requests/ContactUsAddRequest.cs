using System.ComponentModel.DataAnnotations;

namespace Sabio.Models.Requests.ContactUs
{
    public class ContactUsAddRequest
    {
        [Required(ErrorMessage = "Name is required. ")]
        [MinLength(2, ErrorMessage = "Name should be at least 2 characters. ")]
        [MaxLength(255, ErrorMessage = "Name should be at most 255 characters. ")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Email Address is required. ")]
        [EmailAddress(ErrorMessage = "Email Address should be of proper format i.e. roberts@gmail.com . ")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Description is required. ")]
        [MinLength(10, ErrorMessage = "Description should be at least 10 characters. ")]
        [MaxLength(400, ErrorMessage = "Description should be at most 400 characters. ")]
        public string Description { get; set; }
    }
}
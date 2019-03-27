using System;
using System.Collections.Generic;
using System.Text;
using Sabio.Models.Requests;
using System.ComponentModel.DataAnnotations;

namespace Sabio.Models.Domain
{
    public class UserProfile
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string AvatarUrl { get; set; }
        public string Description { get; set; }
        public DateTime DOB { get; set; }
        public string PhoneNumber { get; set; }
        public int UserId { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
    }
}
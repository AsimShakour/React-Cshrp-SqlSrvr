using System;
using System.Collections.Generic;
using System.Text;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Requests;

namespace Sabio.Services
{
    public interface IUserProfileService
    {
        int Insert(UserProfileAddRequest model, int currentId);

        UserProfile Get(int id);

        List<UserProfile> Get();

        void Update(UserProfileUpdateRequest model);

        void Delete(int id);
    }
}
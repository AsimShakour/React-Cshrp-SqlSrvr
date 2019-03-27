using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Sabio.Web;
using Sabio.Models;
using Sabio.Services;
using Sabio.Web.Controllers;
using Microsoft.Extensions.Logging;
using Sabio.Web.Models.Responses;
using Sabio.Models.Requests;
using Sabio.Web.Api;
using Microsoft.AspNetCore.Authentication;
using Sabio.Models.Domain;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/users/profiles")]
    [ApiController]
    public class UserProfileController : BaseApiController
    {
        private ILogger _logger;
        private IUserProfileService _userProfile;
        private IAuthenticationService<int> _authenticationService;

        public UserProfileController(ILogger<UserProfileController> logger, IUserProfileService userProfile, IAuthenticationService<int> authenticationService) : base(logger)
        {
            _logger = logger;
            _userProfile = userProfile;
            _authenticationService = authenticationService;
        }

        [HttpPost]
        public ActionResult<ItemResponse<int>> Insert(UserProfileAddRequest model)
        {
            ActionResult result = null;
            try
            {
                int currentId = _authenticationService.GetCurrentUserId();
                int id = _userProfile.Insert(model, currentId);
                ItemResponse<int> response = new ItemResponse<int>();
                response.Item = id;
                result = Created201(response);
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                result = StatusCode(500, new ErrorResponse(ex.Message));
            }
            return result;
        }

        [HttpGet("{id:int}")]
        public ActionResult<ItemResponse<UserProfile>> Get(int id)
        {
            ActionResult result = null;
            try
            {
                UserProfile model = _userProfile.Get(id);
                if (model == null)
                {
                    result = NotFound404(new ErrorResponse("Does not exist!"));
                }
                else
                {
                    ItemResponse<UserProfile> response = new ItemResponse<UserProfile>();
                    response.Item = model;
                    result = Ok200(response);
                }
            }
            catch (Exception e)
            {
                Logger.LogError(e.ToString());
                result = StatusCode(500, new ErrorResponse(e.Message));
            }
            return result;
        }

        [HttpGet]
        public ActionResult<ItemsResponse<UserProfile>> Get()
        {
            ActionResult result = null;
            try
            {
                List<UserProfile> list = _userProfile.Get();
                if (list == null)
                {
                    result = NotFound404(new ErrorResponse("No records found."));
                }
                else
                {
                    ItemsResponse<UserProfile> response = new ItemsResponse<UserProfile>();
                    response.Items = list;
                    result = Ok200(response);
                }
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                result = StatusCode(500, new ErrorResponse(ex.Message));
            }
            return result;
        }

        [HttpDelete("{id:int}")]
        public ActionResult<SuccessResponse> Delete(int id)
        {
            ActionResult result = null;
            try
            {
                _userProfile.Delete(id);
                SuccessResponse response = new SuccessResponse();
                result = Ok200(response);
            }
            catch (Exception e)
            {
                Logger.LogError(e.ToString());
                result = StatusCode(500, new ErrorResponse(e.Message));
            }
            return result;
        }

        [HttpPut("{id:int}")]
        public ActionResult<SuccessResponse> Update(UserProfileUpdateRequest model)
        {
            ActionResult result = null;
            try
            {
                _userProfile.Update(model);
                SuccessResponse response = new SuccessResponse();
                result = Ok200(response);
            }
            catch (Exception e)
            {
                Logger.LogError(e.ToString());
                result = StatusCode(500, new ErrorResponse(e.Message));
            }
            return result;
        }
    }
}
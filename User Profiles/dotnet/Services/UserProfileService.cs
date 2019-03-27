using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Text;
using Sabio.Data.Providers;
using Sabio.Models.Domain;
using Sabio.Models.Requests;
using Sabio.Services;
using System.Data;
using Sabio.Data;
using Sabio.Models;

namespace Sabio.Services
{
    public class UserProfileService : IUserProfileService
    {
        private IDataProvider _dataProvider;

        public UserProfileService(IDataProvider dataProvider)
        {
            _dataProvider = dataProvider;
        }

        public int Insert(UserProfileAddRequest model, int currentId)
        {
            int id = 0;
            _dataProvider.ExecuteNonQuery("dbo.UserProfiles_Insert", inputParamMapper: delegate (SqlParameterCollection paramCol)
            {
                SqlParameter param = new SqlParameter();
                param.ParameterName = "@Id";
                param.SqlDbType = System.Data.SqlDbType.Int;
                param.Direction = System.Data.ParameterDirection.Output;
                paramCol.Add(param);
                PopulatesParamCol(model, paramCol);
                paramCol.AddWithValue("@UserId", currentId);
            },
            returnParameters: delegate (SqlParameterCollection paramCol)
            {
                int.TryParse(paramCol["@Id"].Value.ToString(), out id);
            }
            );
            return id;
        }

        public UserProfile Get(int id)
        {
            UserProfile model = null;
            _dataProvider.ExecuteCmd("dbo.UserProfiles_SelectById", delegate (SqlParameterCollection paramCol)
            {
                paramCol.AddWithValue("@Id", id);
            },
                delegate (IDataReader reader, short set)
                {
                    model = Mapper(reader);
                });
            return model;
        }

        public List<UserProfile> Get()
        {
            List<UserProfile> result = null;
            _dataProvider.ExecuteCmd(
                "dbo.UserProfiles_SelectAll", inputParamMapper: null, singleRecordMapper: delegate (IDataReader reader, short set)
                  {
                      UserProfile model = Mapper(reader);
                      if (result == null)
                      {
                          result = new List<UserProfile>();
                      }
                      result.Add(model);
                  }
                );
            return result;
        }

        public void Update(UserProfileUpdateRequest model)
        {
            this._dataProvider.ExecuteNonQuery("dbo.UserProfiles_Update",
                inputParamMapper: delegate (SqlParameterCollection paramCol)
                {
                    PopulatesParamCol(model, paramCol);
                    paramCol.AddWithValue("@Id", model.Id);
                }
                );
        }

        public void Delete(int id)
        {
            _dataProvider.ExecuteNonQuery("dbo.UserProfiles_Delete", delegate (SqlParameterCollection paramCol)
            {
                paramCol.AddWithValue("@Id", id);
            }
            );
        }

        private static void PopulatesParamCol(UserProfileAddRequest model, SqlParameterCollection paramCol)
        {
            var nullVal = (object)DBNull.Value;
            paramCol.AddWithValue("@FirstName", model.FirstName);
            paramCol.AddWithValue("@LastName", model.LastName);
            paramCol.AddWithValue("@AvatarUrl", model.AvatarUrl ?? nullVal);
            paramCol.AddWithValue("@Description", model.Description ?? nullVal);
            paramCol.AddWithValue("@DOB", model.DOB ?? nullVal);
            paramCol.AddWithValue("@PhoneNumber", model.PhoneNumber ?? nullVal);
        }

        private static UserProfile Mapper(IDataReader reader)
        {
            UserProfile model = new UserProfile();
            int startingIndex = 0;
            model.Id = reader.GetSafeInt32(startingIndex++);
            model.FirstName = reader.GetSafeString(startingIndex++);
            model.LastName = reader.GetSafeString(startingIndex++);
            model.AvatarUrl = reader.GetSafeString(startingIndex++);
            model.Description = reader.GetSafeString(startingIndex++);
            model.DOB = reader.GetSafeDateTime(startingIndex++);
            model.PhoneNumber = reader.GetSafeString(startingIndex++);
            model.UserId = reader.GetSafeInt32(startingIndex++);
            model.DateCreated = reader.GetSafeDateTime(startingIndex++);
            model.DateModified = reader.GetSafeDateTime(startingIndex++);
            return model;
        }
    }
}
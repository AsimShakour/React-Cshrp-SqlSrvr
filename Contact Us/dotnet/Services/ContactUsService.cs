using System.Data.SqlClient;
using Sabio.Data.Providers;
using System.Data;
using Sabio.Models.Requests.ContactUs;

namespace Sabio.Services
{
    public class ContactUsService : IContactUsService
    {
        private IDataProvider _dataProvider;

        public ContactUsService(IDataProvider dataProvider)
        {
            _dataProvider = dataProvider;
        }

        public int Insert(ContactUsAddRequest model)
        {
            int id = 0;
            _dataProvider.ExecuteNonQuery("dbo.ContactUs_Insert",
                inputParamMapper: delegate (SqlParameterCollection paramCol)
                {
                    SqlParameter param = new SqlParameter();
                    param.ParameterName = "@Id";
                    param.SqlDbType = SqlDbType.Int;
                    param.Direction = ParameterDirection.Output;
                    paramCol.Add(param);
                    PopulatesParamCol(model, paramCol);
                },
                returnParameters: delegate (SqlParameterCollection paramCol)
                {
                    int.TryParse(paramCol["@Id"].Value.ToString(), out id);
                }
                );
            return id;
        }

        private static void PopulatesParamCol(ContactUsAddRequest model, SqlParameterCollection paramCol)
        {
            paramCol.AddWithValue("@Name", model.Name);
            paramCol.AddWithValue("@Email", model.Email);
            paramCol.AddWithValue("@Description", model.Description);
        }
    }
}
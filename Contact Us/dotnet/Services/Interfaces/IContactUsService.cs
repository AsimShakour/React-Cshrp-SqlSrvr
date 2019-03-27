using Sabio.Models.Requests.ContactUs;

namespace Sabio.Services
{
    public interface IContactUsService
    {
        int Insert(ContactUsAddRequest model);
    }
}
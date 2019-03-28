using Microsoft.Extensions.Options;
using Sabio.Models.Domain;
using Sabio.Models.Requests;
using SendGrid;
using SendGrid.Helpers.Mail;
using SendGrid.Helpers.Reliability;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Text;
using System.Threading.Tasks;
using Sabio.Models.Requests.ContactUs;

namespace Sabio.Services
{
    public class EmailService : IEmailService
    {
        private readonly SendGridConfig _config;

        public EmailService(IOptions<SendGridConfig> options)
        {
            _config = options.Value;
        }

        private async Task Send(SendGridMessage msg)
        {
            var apiKey = _config.Secret;
            var client = new SendGridClient(apiKey);
            await client.SendEmailAsync(msg);
        }

        //Waiting on Template, example of how to use substitution jutsu
        public async Task Register(EmailBase model)
        {
            Register register = new Register();
            var msg = new SendGridMessage()
            {
                From = new EmailAddress(_config.Email, _config.Sender),
                Subject = register.Subject,
                HtmlContent = register.HtmlContent
            };
            Dictionary<string, string> subs = new Dictionary<string, string>
            {
                { "-fName-", model.FName },
                { "-lName-", model.LName },
                { "-subject-", "Thank you for Registering" }
            };
            msg.AddSubstitutions(subs);
            msg.AddTo(new EmailAddress(model.To, register.Recipient));
            await Send(msg);
        }

        //Waiting on Template
        public async Task VenueClaim(EmailBase model)
        {
            var msg = new SendGridMessage()
            {
                From = new EmailAddress(_config.Email, _config.Sender),
                Subject = "Venue Claimed Successfully",
                HtmlContent = "<h1>YAAASSSSSS</h1>"
            };
            msg.AddTo(new EmailAddress(model.To, "Yass user"));
            await Send(msg);
        }

        //Waiting on Template
        public async Task Promoter(EmailBase model)
        {
            var msg = new SendGridMessage()
            {
                From = new EmailAddress(_config.Email, _config.Sender),
                Subject = "Promoter Profile Created Successfully",
                HtmlContent = "<h1>YAAASSSSSS</h1>"
            };
            msg.AddTo(new EmailAddress(model.To, "Yass user"));
            await Send(msg);
        }

        //Waiting on Template
        public async Task Event(EmailBase model)
        {
            var msg = new SendGridMessage()
            {
                From = new EmailAddress(_config.Email, _config.Sender),
                Subject = "Reminder of Upcoming Event",
                HtmlContent = "<h1>YAAASSSSSS</h1>"
            };
            msg.AddTo(new EmailAddress(model.To, "Yass user"));
            await Send(msg);
        }

        //waiting on Template
        public async Task Confirmed(EmailBase model)
        {
            var msg = new SendGridMessage()
            {
                From = new EmailAddress(_config.Email, _config.Sender),
                Subject = "Profile Successfully Confirmed",
                HtmlContent = "<h1>YAAASSSSSS</h1>"
            };
            msg.AddTo(new EmailAddress(model.To, "Yass user"));
            await Send(msg);
        }

        //Left here for Testing purposes, if someone has issue with it here it may be deleted freely
        public async Task SendGridFunc(EmailAddRequest model)
        {
            var msg = new SendGridMessage()
            {
                From = new EmailAddress(_config.Email),
                Subject = model.Subject,
                HtmlContent = model.HtmlContent
            };
            msg.AddTo(new EmailAddress(model.To, model.RecipientName));
            await Send(msg);
        }

        //For Asim's Contact Us Email
        public async Task ContactUsEmail(ContactUsAddRequest model)
        {
            var msg = new SendGridMessage()
            {
                From = new EmailAddress(model.Email),
                Subject = "Needs your help: " + model.Name,
                PlainTextContent = model.Description
            };
            msg.AddTo(new EmailAddress("v2q2h8z7w6j0y6o1@sabionation.slack.com", "ContactUsAdmin"));
            await Send(msg); 
        }
    }
}

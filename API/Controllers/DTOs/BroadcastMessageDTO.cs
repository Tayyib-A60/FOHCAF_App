using System.Collections.Generic;
using API.Core.Models;

namespace API.Controllers.DTOs
{
    public class BroadcastMessageDTO
    {
        public string Subject { get; set; }
        public NameEmailPairDTO From { get; set; }
        public NameEmailPairDTO To { get; set; }
        public string Message { get; set; }
    }
}
namespace API.Core.Models
{
    public class BroadcastMessage
    {
        public string Subject { get; set; }
        public NameEmailPair From { get; set; }
        public NameEmailPair To { get; set; }
        public string Message { get; set; }
    }
}
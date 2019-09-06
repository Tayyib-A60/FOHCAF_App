namespace API.Core.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public int BlogPostId { get; set; }
        public string MadeBy { get; set; }
        public string CommentMade { get; set; }
    }
}
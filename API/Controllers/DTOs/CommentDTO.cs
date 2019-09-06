namespace API.Controllers.DTOs
{
    public class CommentDTO
    {        
        public int Id { get; set; }
        public int BlogPostId { get; set; }
        public string MadeBy { get; set; }
        public string CommentMade { get; set; }
    }
}
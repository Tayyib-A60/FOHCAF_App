namespace API.Controllers.DTOs
{
    public class PhotoDTO
    {
        public int Id { get; set; }
        public string FileName { get; set; }
        public int BlogPostId { get; set; }
        public bool IsMain { get; set; }
    }
}
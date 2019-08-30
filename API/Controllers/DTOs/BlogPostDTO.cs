using System.Collections.Generic;
using API.Core.Models;

namespace API.Controllers.DTOs
{
    public class BlogPostDTO
    {
        public int Id { get; set; }
        public string Heading { get; set; }
        public string Body { get; set; }
        public string Author { get; set; }
        public ICollection<Photo> Photo { get; set; }
    }
}
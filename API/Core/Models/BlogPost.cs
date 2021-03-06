using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;

namespace API.Core.Models
{
    public class BlogPost
    {
        public int Id { get; set; }
        [Required]
        [StringLength(255)]
        public string Heading { get; set; }
        [Required]
        public string Body { get; set; }
        [Required]
        public string Author { get; set; }
        [Required]
        public DateTime Date { get; set; }
        public ICollection<Photo> Photo { get; set; }
        public ICollection<Comment> Comments { get; set; }
    }
}
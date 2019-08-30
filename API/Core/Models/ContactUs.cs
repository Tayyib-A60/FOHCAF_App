using System;
using System.ComponentModel.DataAnnotations;

namespace API.Core.Models
{
    public class ContactUs
    {
        public int Id { get; set; }
        [Required]
        [StringLength(255)]
        public string Name { get; set; }
        [Required]
        [StringLength(255)]
        public string Email { get; set; }
        [Required]
        [StringLength(255)]
        public string Phone { get; set; }
        [StringLength(1000)]
        public string Message { get; set; }
        public DateTime date { get; } = DateTime.UtcNow;
    }
}
using API.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Persistence
{
    public class FOHCAFDbContext: DbContext
    {
        public FOHCAFDbContext(DbContextOptions<FOHCAFDbContext> options) : base(options) {}
        public DbSet<BlogPost> BlogPosts { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<ContactUs> ContactUs { get; set; }
        public DbSet<Subscriber> Subscribers { get; set; }
        public DbSet<Photo> Photos { get; set; }
        public DbSet<Comment> Comments { get; set; }      
    }
}
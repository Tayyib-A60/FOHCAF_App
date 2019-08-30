using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Core;
using API.Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace API.Persistence
{
    public class FOHCAFRepository : IFOHCAFRepository
    {
        private FOHCAFDbContext _context { get; }
        private IConfiguration _configuration { get; }
        public FOHCAFRepository (FOHCAFDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }
        public void Add<T>(T entity) where T : class
        {
            _context.Entry(entity).State = EntityState.Added;
        }
        public void Update<T>(T entity) where T : class
        {
            _context.Entry(entity).State = EntityState.Modified;
        }
        public void Delete<T>(T entity) where T : class
        {
            _context.Entry(entity).State = EntityState.Deleted;
        }
        public async Task<bool> SaveAllChanges()
        {
            return await _context.SaveChangesAsync() > 0;
        }
        public async Task<BlogPost> GetBlogPost(int postId)
        {
            var post =  await _context.BlogPosts
                            .FirstOrDefaultAsync(p => p.Id == postId);
            return post;
        }
        public async Task<IEnumerable<Subscriber>> GetSubscribers()
        {
            return await _context.Subscribers
                        .ToListAsync();
        }
        public async Task<QueryResult<BlogPost>> GetBlogPosts(QueryParams queryParams)
        {
            var blogPosts =  _context.BlogPosts.Include(bp => bp.Photo)
            // .Where(bp => bp.Photo.Any(p => p.IsMain == true))
                                .AsQueryable();
            blogPosts = FilterPosts(queryParams, blogPosts);

            var count = blogPosts.Count();
            blogPosts = blogPosts.Skip((queryParams.CurrentPage - 1) * queryParams.PageSize)
                                    .Take(queryParams.PageSize);
            var queryResult = new QueryResult<BlogPost>();
            queryResult.TotalItems = count;
            queryResult.BlogPosts = await blogPosts.ToListAsync();
            return queryResult;
        }
        public IQueryable<BlogPost> FilterPosts(QueryParams queryParams, IQueryable<BlogPost> blogPosts)
        {
            if(!string.IsNullOrWhiteSpace(queryParams.Year)) {
                blogPosts = blogPosts.Where(bp => bp.date.Year.ToString() == queryParams.Year);
            }
            if(!string.IsNullOrWhiteSpace(queryParams.Month)) {
                blogPosts = blogPosts.Where(bp => bp.date.Month.ToString() == queryParams.Month);
            }
            if(!string.IsNullOrWhiteSpace(queryParams.SearchString)) {
                blogPosts = blogPosts.Where(bp => bp.Heading.ToLower().Contains(queryParams.SearchString.ToLower()));
            }
            return blogPosts;
        }
        public async Task<bool> EntityExists<T>(T entityName) where T: class
        {
            if(entityName is BlogPost) {
                BlogPost blogPost = entityName as BlogPost;
                if( await _context.BlogPosts.AnyAsync(b => b.Heading == blogPost.Heading || b.Id == blogPost.Id))
                    return true;
                return false;
            } else if(entityName is User) {
                User user = entityName as User;
                if(await _context.Users.AnyAsync(u => u.Email == user.Email))
                    return true;
                return false;
            } else {
                return false;
            }
        }
        public async void EmailSender(BroadcastMessage broadcastMessage)
        {
            var apiKey = _configuration.GetSection ("SkineroMotorsSendGridApiKey").Value;
            var sendGridclient = new SendGridClient (apiKey);
            var from = new EmailAddress (broadcastMessage.From.Email, broadcastMessage.From.Name);
            var subject = "Skinero Motors Contact us";
            var to = new EmailAddress (broadcastMessage.To.Email, broadcastMessage.To.Name);
            var htmlContent = $"<div style='background-color: aqua; color: lime;'>{broadcastMessage.Message}</div>";
            var msg = MailHelper.CreateSingleEmail (from, to, subject, null, htmlContent);
            var response = await sendGridclient.SendEmailAsync (msg);
        }
        
    }
}
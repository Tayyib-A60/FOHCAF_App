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
        public async Task<Comment> GetComment(int commentId)
        {
            return await _context.Comments
                                .FirstOrDefaultAsync(c => c.Id == commentId);
        }
        public async Task<IEnumerable<Subscriber>> GetSubscribers()
        {
            return await _context.Subscribers
                        .ToListAsync();
        }
        public async Task<QueryResult<BlogPost>> GetBlogPosts(QueryParams queryParams)
        {
            var blogPosts =  _context.BlogPosts
                                .AsQueryable();
            blogPosts = FilterPosts(queryParams, blogPosts);
            var count = blogPosts.Count();
            blogPosts = blogPosts.OrderByDescending(bp => bp.Id);
            blogPosts = blogPosts.Skip((queryParams.CurrentPage - 1) * queryParams.PageSize)
                                    .Take(queryParams.PageSize);
            var queryResult = new QueryResult<BlogPost>();
            queryResult.TotalItems = count;
            queryResult.BlogPosts = await blogPosts.ToListAsync();
            return queryResult;
        }
        public async Task<QueryResult<Comment>> GetComments(int id, CommentQuery commentQuery)
        {
            var comments = _context.Comments
                            .Where(c => c.BlogPostId == id).AsQueryable();
            var count = comments.Count();
            comments = comments.OrderByDescending(c => c.Id);
            comments = comments.Skip((commentQuery.CurrentCount - 1) * 5)
                                    .Take(5);
            var queryResult = new QueryResult<Comment>();
            queryResult.TotalItems = count;
            queryResult.BlogPosts = await comments.ToListAsync();
            return queryResult;
        }
        private IQueryable<BlogPost> FilterPosts(QueryParams queryParams, IQueryable<BlogPost> blogPosts)
        {
            if(!string.IsNullOrWhiteSpace(queryParams.Year)) {
                blogPosts = blogPosts.Where(bp => bp.Date.Year.ToString() == queryParams.Year);
            }
            if(!string.IsNullOrWhiteSpace(queryParams.Month)) {
                blogPosts = blogPosts.Where(bp => bp.Date.Month.ToString() == queryParams.Month);
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
            } else if(entityName is Comment) {
                Comment comment = entityName as Comment;
                if(await _context.Comments.AnyAsync(c => c.Id == comment.Id))
                    return true;
                return false;
            } else if(entityName is Subscriber) {
                Subscriber subscriber = entityName as Subscriber;
                if(await _context.Subscribers.AnyAsync(s => s.Email == subscriber.Email))
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
            var subject = broadcastMessage.Subject;
            var to = new EmailAddress (broadcastMessage.To.Email, broadcastMessage.To.Name);
            var htmlContent = $"<div style='background-color: #ffffff; margin: 0 auto;  color: rgb(30, 31, 30);'><div  style='background-color: #fcd2d2; padding: 12px; border-top-left-radius: 8px; border-top-right-radius: 8px;'><img src='./logo-1446293_640.png' style='max-height: 36px; max-width: 36px' /></div><div style='background-color: #ffffff; padding: 20px; font-size: 20px'><p>{broadcastMessage.Message}</p></div><div style='background-color: #fcd2d2; padding: 9px; border-bottom-left-radius: 8px;border-bottom-right-radius: 8px;'></div></div>";
            var msg = MailHelper.CreateSingleEmail (from, to, subject, null, htmlContent);
            var response = await sendGridclient.SendEmailAsync (msg);
        }
        
    }
}
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Core.Models;

namespace API.Core
{
    public interface IFOHCAFRepository
    {
         void Add<T>(T entity) where T : class;
         void Delete<T>(T entity) where T : class;
         void Update<T>(T entity) where T : class;
         Task<BlogPost> GetBlogPost(int postId);
         Task<Comment> GetComment(int commentId);
         Task<QueryResult<BlogPost>> GetBlogPosts(QueryParams queryParams);
         Task<QueryResult<Comment>> GetComments(int id, CommentQuery commentQuery);
         Task<IEnumerable<Subscriber>> GetSubscribers();
         void EmailSender(BroadcastMessage broadcastMessage);
         Task<bool> EntityExists<T>(T entityName) where T: class;
         Task<bool> SaveAllChanges();
    }
}
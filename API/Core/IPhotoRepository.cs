using System.Collections.Generic;
using System.Threading.Tasks;
using API.Core.Models;

namespace API.Core
{
    public interface IPhotoRepository
    {
        Task<IEnumerable<Photo>> GetPhotos(int blogPostId);
         Task<Photo> GetPhoto(int blogPostID);
         Task<Photo> GetSinglePhoto(int id, int blogPostId);
         Task CompleteAsync();
    }
}
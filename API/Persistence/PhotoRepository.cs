using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Core;
using API.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Persistence
{
    public class PhotoRepository : IPhotoRepository
    {
        private FOHCAFDbContext  _context { get; }
        public PhotoRepository(FOHCAFDbContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Photo>> GetPhotos(int blogPostId)
        {
            return await _context.Photos
                    .Where(p => p.BlogPostId == blogPostId)
                    .ToListAsync(); 
        }
        public async Task<Photo> GetSinglePhoto(int id, int blogPostId)
        {
            return await _context.Photos
                            .SingleOrDefaultAsync(p => p.Id == id && p.BlogPostId == blogPostId);
        }
        public async Task<Photo> GetPhoto(int blogPostID)
        {
            return await _context.Photos.SingleOrDefaultAsync(p => p.BlogPostId == blogPostID && p.IsMain == true);
        }
        public async Task CompleteAsync()
        {
            await _context.SaveChangesAsync();
        }
        
    }
}
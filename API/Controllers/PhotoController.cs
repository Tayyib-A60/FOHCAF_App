using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using API.Controllers.DTOs;
using API.Core;
using API.Core.Models;
using AutoMapper;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace SkineroMotors.Controllers {
    [Route ("/api/photos/{blogPostId}")]
    [ApiController]
    public class PhotosController : Controller {
        private PhotoSettings _photoSettings { get; }
        private IHostingEnvironment _host { get; }
        private IMapper _mapper { get; }
        private IFOHCAFRepository _repository { get; }
        private IPhotoRepository _photoRepository { get; }
        public PhotosController (IHostingEnvironment host, IMapper mapper, IFOHCAFRepository repository, IPhotoRepository photoRepository,IOptionsSnapshot<PhotoSettings> options)
        {
            _photoSettings = options.Value;
            _photoRepository = photoRepository;
            _repository = repository;
            _mapper = mapper;
            _host = host;
        }
        [HttpGet("getPhotos")]
        public async Task<IEnumerable<PhotoDTO>> GetBlogPostPhotos(int blogPostId)
        {
            var photos = await _photoRepository.GetPhotos(blogPostId);
            return _mapper.Map<IEnumerable<PhotoDTO>>(photos);
        }
        [HttpPut("makeMain/{id}")]
        public async Task<IActionResult> MakeMainPhoto(int blogPostId, int id)
        {
            var currentMainPhoto = await _photoRepository.GetPhoto(blogPostId);
            
            var photo = await _photoRepository.GetSinglePhoto(id, blogPostId);

            if(photo.IsMain) return BadRequest("This is already the main photo");
            
            if(currentMainPhoto != null)
                currentMainPhoto.IsMain = false;
            photo.IsMain = true;
            await _photoRepository.CompleteAsync();
            return Ok();
        }
        [HttpGet("getPhoto")]
        public async Task<PhotoDTO> GetBlogPostMainPhoto(int blogPostId)
        {
            var photo = await _photoRepository.GetPhoto(blogPostId);
            return _mapper.Map<PhotoDTO>(photo);
        }
        [HttpPost]
        public async Task<IActionResult> Upload(int blogPostId, IFormFile file)
        {
            var blogPost = await _repository.GetBlogPost (blogPostId);
            if (blogPost == null) return NotFound ("Not Found");
            if (file == null) return BadRequest ("Null file");
            if (file.Length == 0) return BadRequest ("Empty file");
            if (file.Length > _photoSettings.MaxBytes) return BadRequest ("Maximum file size exceeded");
            if (!_photoSettings.isSupported (file.FileName)) return BadRequest ("Invalid file type.");

             var uploadsFolderPath = Path.Combine (_host.WebRootPath, "uploads");
            if (!Directory.Exists (uploadsFolderPath))
                Directory.CreateDirectory (uploadsFolderPath);

            var fileName = Guid.NewGuid ().ToString () + Path.GetExtension (file.FileName);
            var filePath = Path.Combine (uploadsFolderPath, fileName);

            using (var stream = new FileStream (filePath, FileMode.Create)) {
                await file.CopyToAsync (stream);
            }
            var photo = new Photo { FileName = fileName , BlogPostId = blogPostId };
            _repository.Add(photo);
            await _repository.SaveAllChanges();
            return Ok (photo.FileName);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePhoto(int blogPostId, int id)
        {
            var photo = await _photoRepository.GetSinglePhoto(id, blogPostId);
            if(photo == null)
                return NotFound("Photo not found");
            var uploadsFolderPath = Path.Combine (_host.WebRootPath, "uploads");
            var filePath = Path.Combine (uploadsFolderPath, photo.FileName);
            FileInfo fileInfo = new FileInfo(filePath);
            _repository.Delete(photo);
            if(fileInfo.Exists)
                fileInfo.Delete();
            await _repository.SaveAllChanges();

            return Ok(id);
        }
    }
}
using System.Threading.Tasks;
using API.Controllers.DTOs;
using API.Core;
using API.Core.Models;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/fohcaf")]
    [ApiController]
    public class FohcafController : ControllerBase
    {
        private IFOHCAFRepository _repository { get; }
        private IMapper _mapper { get; }
        public FohcafController(IMapper mapper, IFOHCAFRepository repository)
        {
            _mapper = mapper;
            _repository = repository;
        }
        [HttpPost("createBlogPost")]
        public async Task<IActionResult> CreateBlogPost([FromBody] BlogPostDTO blogPostDTO)
        {
            var blogPostToCreate = _mapper.Map<BlogPost>(blogPostDTO);
            if(await _repository.EntityExists(blogPostToCreate)) {
                return BadRequest("This post has already been created");
            }
            _repository.Add(blogPostToCreate);
            await _repository.SaveAllChanges();
            return Ok();
        }
        [HttpDelete("deleteBlogPost/{blogPostId}")]
        public async Task<IActionResult> DeleteBlogPost(int blogPostId)
        {
            var blogPostToDelete = await _repository.GetBlogPost(blogPostId);
            if(blogPostToDelete == null)
                return BadRequest("BlogPost does not exist");
            _repository.Delete(blogPostToDelete);
            var success = await _repository.SaveAllChanges();
            return Ok(success);
        }
        [HttpPut("updateBlogPost/{blogPostId}")]
        public IActionResult UpdateBlogPost(int blogPostId, [FromBody] BlogPostDTO blogPostDTO) 
        {
            if(blogPostId != blogPostDTO.Id)
                return BadRequest("Blogpost not found");
            var blogPostToUpdate = _mapper.Map<BlogPost>(blogPostDTO);
            if(blogPostToUpdate == null)
                return NotFound();
            _repository.Update(blogPostToUpdate);
            return Ok();
        }
        [HttpGet("getBlogPost/{blogPostId}")]
        public async Task<IActionResult> GetBlogPost(int blogPostId)
        {
            var blogPost = await _repository.GetBlogPost(blogPostId);
            if(blogPost == null)
                return NotFound();
            return Ok(blogPost);
        }
        [HttpGet("getBlogPosts")]
        public async Task<IActionResult> GetBlogPosts([FromQuery] QueryParams queryParams)
        {
            var blogPosts = await _repository.GetBlogPosts(queryParams);
            return Ok(blogPosts);
        }
        [HttpPost("subscribe")]
        public IActionResult AddSubscriber([FromForm] SubscriberDTO subscriberDTO)
        {
            var subscriberToCreate = _mapper.Map<Subscriber>(subscriberDTO);
            _repository.Add(subscriberToCreate);
            return Ok();
        }
        [HttpPost("broadcastToSubscribers")]
        public async Task<IActionResult> SendMailToSubscribers([FromForm] BroadcastMessageDTO broadcastMessageDTO) 
        {
            var broadcastMessage = _mapper.Map<BroadcastMessage>(broadcastMessageDTO);
            var subscribers = await _repository.GetSubscribers();
            foreach (var subscriber in subscribers)
            {
                broadcastMessage.To.Email = subscriber.Email;
                broadcastMessage.To.Name = subscriber.FullName;
                try
                {
                    _repository.EmailSender(broadcastMessage);
                }
                catch (System.Exception ex)
                {
                    return Ok(ex.Message);
                    throw;
                }
            }
            return Ok();
        }

    }
}
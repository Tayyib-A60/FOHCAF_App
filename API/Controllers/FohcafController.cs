using System;
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
            blogPostToCreate.Date = DateTime.UtcNow;
            if(await _repository.EntityExists(blogPostToCreate)) {
                return BadRequest("This post has already been created");
            }
            _repository.Add(blogPostToCreate);
            await _repository.SaveAllChanges();
            return Ok();
        }
        [HttpPost("postComment")]
        public async Task<IActionResult> PostComment([FromBody] CommentDTO commentDTO)
        {
            var commentToPost = _mapper.Map<Comment>(commentDTO);
            if(await _repository.EntityExists(commentToPost)) {
                return BadRequest("This comment has already been made");
            }
            _repository.Add(commentToPost);
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
            await _repository.SaveAllChanges();
            return Ok();
        }
        [HttpDelete("deleteComment/{commentId}/{blogPostId}")]
        public async Task<IActionResult> DeleteComment(int commentId, int blogPostId)
        {
            var commentToDelete = await _repository.GetComment(commentId);
            if(commentToDelete == null)
                return BadRequest("Comment does not exist");
            _repository.Delete(commentToDelete);
            await _repository.SaveAllChanges();
            return Ok();
        }
        [HttpPut("updateBlogPost/{blogPostId}")]
        public async Task<IActionResult> UpdateBlogPost(int blogPostId, [FromBody] BlogPostDTO blogPostDTO) 
        {
            // if(blogPostId != blogPostDTO.Id)
            //     return BadRequest("Blogpost not found");
            var blogPost = await _repository.GetBlogPost(blogPostId);
            var blogPostToUpdate = _mapper.Map<BlogPostDTO, BlogPost>(blogPostDTO, blogPost);
            if(blogPostToUpdate == null)
                return NotFound();
            _repository.Update(blogPostToUpdate);
            await _repository.SaveAllChanges();
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
        [HttpGet("getComments/{id}")]
        public async Task<IActionResult> GetComments([FromQuery] CommentQuery commentQuery, int id)
        {
            var comments = await _repository.GetComments(id, commentQuery);
            return Ok(comments);
        }
        [HttpPost("subscribe")]
        public async Task<IActionResult> AddSubscriber([FromBody] SubscriberDTO subscriberDTO)
        {
            var subscriberToCreate = _mapper.Map<Subscriber>(subscriberDTO);
            if(await _repository.EntityExists(subscriberToCreate))
                return BadRequest("You have already been added to our subscription list, thank you");
            _repository.Add(subscriberToCreate);
            await _repository.SaveAllChanges();
            return Ok();
        }
        [HttpPost("broadcastToSubscribers")]
        public async Task<IActionResult> SendMailToSubscribers([FromBody] BroadcastMessageDTO broadcastMessageDTO) 
        {
            var broadcastMessage = _mapper.Map<BroadcastMessage>(broadcastMessageDTO);
            var subscribers = await _repository.GetSubscribers();
            foreach (var subscriber in subscribers)
            {
                broadcastMessage.To = new NameEmailPair();
                broadcastMessage.To.Email = subscriber.Email;
                broadcastMessage.To.Name = "";
                try
                {
                    _repository.EmailSender(broadcastMessage);
                }
                catch (System.Exception ex)
                {
                    return BadRequest(ex.Message);
                    throw;
                }
            }
            return Ok();
        }
        [HttpPost("sendSingleMessage")]
        public IActionResult SendSingleMessage([FromBody] BroadcastMessageDTO broadcastMessageDTO) 
        {
            var broadcastMessage = _mapper.Map<BroadcastMessage>(broadcastMessageDTO);
                try
                {
                    _repository.EmailSender(broadcastMessage);
                }
                catch (System.Exception ex)
                {
                    return BadRequest(ex.Message);
                    throw;
                }
            return Ok();
        }

    }
}
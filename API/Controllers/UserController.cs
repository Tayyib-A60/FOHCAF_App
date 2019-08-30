using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Controllers.DTOs;
using API.Core;
using API.Core.Models;
using API.Extension;
using AutoMapper;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace API.Controllers {
    [Route ("api/user")]
    [ApiController]
    public class UserController : ControllerBase {
        private IUserRepository _repository { get; }
        private IConfiguration _configuration { get; }
        private AppSettings _appSettings { get; set; }
        private IFOHCAFRepository _fohcafRepository { get; }
        private IMapper _mapper { get; }
        public UserController (IUserRepository repository, IConfiguration configuration,IOptions<AppSettings> appSettings, IFOHCAFRepository fohcafRepository, IMapper mapper)
        {
            _repository = repository;
            _fohcafRepository = fohcafRepository;
            _mapper = mapper;
            _configuration = configuration;
            _appSettings = appSettings.Value;
        }

        [AllowAnonymous]
        [HttpPost ("authenticate")]
        public IActionResult Authenticate ([FromBody] UserDTO userDTO) {
            var user = _repository.Authenticate (userDTO.Email, userDTO.Password);

            if (user == null)
                return Unauthorized ();
            var tokenString = _repository.CreateToken(user);
            return Ok (new {
                Id = user.Id,
                    Name = user.Name,
                    Email = user.Email,
                    Token = tokenString,
                    Roles = user.Role.ToString()
            });
        }

        [AllowAnonymous]
        [HttpPost("forgotPassword")]
        public async Task<IActionResult> ForgotPassword ([FromBody] UserDTO userResource) {
            // if (!await _repository.ForgotPassword (email.ToString()))
            //     return BadRequest ("User does not exist");
            var user = _mapper.Map<User>(userResource);
            var token = _repository.CreateToken (user);

            var apiKey = _configuration.GetSection ("SkineroMotorsSendGridApiKey").Value;
            var sendGridclient = new SendGridClient (apiKey);
            var from = new EmailAddress ("info@skineromotors.com", "SkineroMotors");
            var subject = "Skinero Motors Contact us";
            var to = new EmailAddress (user.Email, user.Name);
            var plainTextContent1 = $"<strong>http://localhost:4200/user/resetPassword?token={token}</strong>";
            var htmlContent = $"http://localhost:4200/user/resetpassword?token={token}";
            var msg = MailHelper.CreateSingleEmail (from, to, subject, plainTextContent1, htmlContent);
            var response = await sendGridclient.SendEmailAsync (msg);
            return Ok ();
        }

        [AllowAnonymous]
        [HttpPost ("register")]
        public async Task<IActionResult> Register ([FromBody] UserDTO userResource) {
            var user = _mapper.Map<User> (userResource);
            if (await _repository.UserExists (user))
                return BadRequest ("User already exists");
            try {
                await _repository.CreateUser (user, userResource.Password);
                return Ok ($"User with email {user.Email} Created");
            } catch (Exception ex) {
                return BadRequest (ex.Message);
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetAll () {
            var users = await _repository.GetUsers ();
            var usersResource = _mapper.Map<IEnumerable<UserDTO>> (users);
            return Ok (usersResource);
        }

        [HttpGet ("{id}")]
        public async Task<IActionResult> GetUser (int id) {
            var user = await _repository.GetUser (id);
            var userDTO = _mapper.Map<UserDTO> (user);
            return Ok (userDTO);
        }
        [HttpGet ("{email}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetUser (string email) {
            var user = await _repository.GetUser (email);
            if (user == null)
                return NotFound("Specified user doesn't exist");
            var userDTO = _mapper.Map<UserDTO> (user);
            return Ok (userDTO);
        }

        [HttpPut ("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> UpdateUser (int id, [FromBody] UserDTO userResource) {
            if (userResource == null)
                return BadRequest("User cannot be null");
            var userToUpdate = await _repository.GetUser(id);
            if (userToUpdate == null)
                return NotFound("User does not exist");
             _mapper.Map<UserDTO, User> (userResource, userToUpdate);
             _repository.UpdateUser(userResource.Password, userToUpdate);
             return Ok("User update was succesfull");
        }

        [HttpDelete ("{id}")]
        public async Task<IActionResult> Delete (int id) {
            var user = await _repository.GetUser (id);
            _repository.DeleteUser (user);
            return Ok (id);
        }
    }
}
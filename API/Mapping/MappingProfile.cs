using API.Controllers.DTOs;
using API.Core.Models;
using AutoMapper;

namespace API.Mapping
{
    public class MappingProfile: Profile
    {
        public MappingProfile()
        {
            // CreateMap<Source, Destination>();
            // API to Domain
            CreateMap<UserDTO, User>();
            CreateMap<BlogPostDTO, BlogPost>();
            CreateMap<ContactUsDTO, ContactUs>();
            CreateMap<BroadcastMessageDTO, BroadcastMessage>();

            // Domain to API Resource
            CreateMap<User, UserDTO>();
            CreateMap<BlogPost, BlogPostDTO>();
            CreateMap<ContactUs, ContactUsDTO>();
            CreateMap<BroadcastMessage, BroadcastMessage>();

        }
    }
}
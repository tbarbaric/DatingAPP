using System.Linq;
using API.DTOs;
using API.Entities;
using API.Extensions;
using AutoMapper;

namespace API.Helpers
{
    // see '8.94 Adding AutoMapper' for details
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<AppUser, MemberDto>()
                .ForMember(
                    dest => dest.PhotoUrl,
                    opt => opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url))
                .ForMember(
                    dest => dest.Age,
                    opt => opt.MapFrom(src => src.DateOfBirth.CalculateAge()));
                    
            CreateMap<Photo, PhotoDto>();

            CreateMap<MemberUpdateDto, AppUser>(); // see '10.118 Persisting the changes in the API' for details

            CreateMap<RegisterDto, AppUser>(); // see '12.148 Updating the API register method' for details
        }
    }
}
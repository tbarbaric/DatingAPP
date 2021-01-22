using System;
using System.Collections.Generic;

namespace API.DTOs
{
    // see '8.93 Adding a DTO for Members' on why this Dto (and PhotoDto) was created
    public class MemberDto
    {
        public int Id { get; set; }
        public string Username { get; set; } // != AppUser.UserName
        public string PhotoUrl { get; set; } // main photo (url) of our user/member; populated via AutoMapper (see AutoMapperProfiles class)
        public int Age { get; set; } // AutoMapper will be able to populate this ('looking' at AppUser.GetAge method); see '8.95 Using AutoMapper'
        public string KnownAs { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }
        public string Gender { get; set; }
        public string Introduction { get; set; }
        public string LookingFor { get; set; }
        public string Interests { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public ICollection<PhotoDto> Photos { get; set; }
    }
}
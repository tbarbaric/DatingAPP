using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface IUserRepo
    {
         void Update(AppUser user);
         Task<bool> SaveAllAsync();
         Task<IEnumerable<AppUser>> GetUsersAsync();
         Task<AppUser> GetUserByIdAsync(int id);
         Task<AppUser> GetUserByUsernameAsync(string username);
         Task<IEnumerable<MemberDto>> GetMembersAsync(); // see '8.97 Using AutoMapper queryable extensions'
         Task<MemberDto> GetMemberAsync(string username); // see '8.97 Using AutoMapper queryable extensions'
    }
}
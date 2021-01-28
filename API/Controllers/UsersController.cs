using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize]
    public class UsersController : BaseApiController
    {
        // see '8.89 Seeding data part two' on how to test this using Postman
        private readonly IUserRepo _userRepo;
        private readonly IMapper _mapper;

        public UsersController(IUserRepo userRepo, IMapper mapper)
        {
            _userRepo = userRepo;
            _mapper = mapper;
        }

        [HttpGet]
        //[AllowAnonymous]
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
        {
            // var users = await _userRepo.GetUsersAsync();

            // var usersToReturn = _mapper.Map<IEnumerable<MemberDto>>(users);

            // return Ok(usersToReturn);

            // see '8.97 Using AutoMapper queryable extensions' for this optimization
            var users = await _userRepo.GetMembersAsync();

            return Ok(users);
        }

        // // api/users/3
        // [HttpGet("{id}")]
        // //[Authorize]
        // public async Task<ActionResult<AppUser>> GetUser(int id)
        // {
        //     var user = await _context.Users.FindAsync(id);

        //     return user;
        // }

        [HttpGet("{username}")]
        public async Task<ActionResult<MemberDto>> GetUser(string username)
        {
            // var user = await _userRepo.GetUserByUsernameAsync(username);

            // return _mapper.Map<MemberDto>(user);

            return await _userRepo.GetMemberAsync(username); // see '8.97 Using AutoMapper queryable extensions' for this optimization
        }

        // see '10.118 Persisting the changes in the API' for details
        [HttpPut]
        public async Task<ActionResult> UpdateUser(MemberUpdateDto memberUpdateDto)
        {
            var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value; // get the username from the token
            var user = await _userRepo.GetUserByUsernameAsync(username);

            _mapper.Map(memberUpdateDto, user);

            _userRepo.Update(user);

            if (await _userRepo.SaveAllAsync())
                return NoContent();

            return BadRequest("Failed to update user");
        }
    }
}
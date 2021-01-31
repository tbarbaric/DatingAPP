using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
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
        private readonly IPhotoService _photoService;

        public UsersController(
            IUserRepo userRepo,
            IMapper mapper,
            IPhotoService photoService)
        {
            _userRepo = userRepo;
            _mapper = mapper;
            _photoService = photoService;
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

        [HttpGet("{username}", Name="GetUser")] // see '11.129 Using the Created At Route method' for why we set the Name here
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
            //var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value; // get the username from the token
            var user = await _userRepo.GetUserByUsernameAsync(User.GetUsername());

            _mapper.Map(memberUpdateDto, user);

            _userRepo.Update(user);

            if (await _userRepo.SaveAllAsync())
                return NoContent();

            return BadRequest("Failed to update user");
        }

        // see '11.127 Updating the users controller' for details
        // see '11.128 Testing the photo upload' on how to test/debug this endpoint with Postman
        // see '11.129 Using the Created At Route method' for additional details
        [HttpPost("add-photo")]
        public async Task<ActionResult<PhotoDto>> AddPhoto(IFormFile file)
        {
            var user = await _userRepo.GetUserByUsernameAsync(User.GetUsername());

            var uploadResult = await _photoService.AddPhotoAsync(file);

            if (uploadResult.Error != null)
                return BadRequest(uploadResult.Error.Message);

            var photo = new Photo()
            {
                Url = uploadResult.SecureUrl.AbsoluteUri,
                PublicId = uploadResult.PublicId
            };

            if (user.Photos.Count == 0)
            {
                photo.IsMain = true;
            }

            user.Photos.Add(photo);

            if (await _userRepo.SaveAllAsync())
            {
                //return _mapper.Map<PhotoDto>(photo);

                return CreatedAtRoute("GetUser", new { username = user.UserName } ,_mapper.Map<PhotoDto>(photo)); // see '11.129 Using the Created At Route method'
            }

            return BadRequest("Problem adding photo");
        }

        // see '11.133 Setting the main photo in the API' for details
        [HttpPut("set-main-photo/{photoId}")]
        public async Task<ActionResult> SetMainPhoto(int photoId)
        {
            var user = await _userRepo.GetUserByUsernameAsync(User.GetUsername());

            var photo = user.Photos.FirstOrDefault(p => p.Id == photoId);

            if (photo.IsMain)
                return BadRequest("This is already your main photo");

            var currentMain = user.Photos.FirstOrDefault(p => p.IsMain);

            if (currentMain != null)
                currentMain.IsMain = false;

            photo.IsMain = true;

            if (await _userRepo.SaveAllAsync())
                return NoContent();

            return BadRequest("Failed to set main photo");
        }

        // see '11.136 Deleting photos - API' for details
        [HttpDelete("delete-photo/{photoId}")]
        public async Task<ActionResult> DeletePhoto(int photoId)
        {
            var user = await _userRepo.GetUserByUsernameAsync(User.GetUsername());

            var photo = user.Photos.FirstOrDefault(p => p.Id == photoId);

            if (photo == null)
                return NotFound();

            if (photo.IsMain)
                return BadRequest("You cannot delete your main photo");

            if (photo.PublicId != null)
            {
                var deletionResult = await _photoService.DeletePhotoAsync(photo.PublicId);

                if (deletionResult.Error != null)
                    return BadRequest(deletionResult.Error.Message);
            }

            user.Photos.Remove(photo);

            if (await _userRepo.SaveAllAsync())
                return Ok();

            return BadRequest("Failed to delete photo");
        }
    }
}
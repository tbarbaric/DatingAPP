namespace API.DTOs
{
    // This is the object we're gonna return when a user logs/registers in
    public class UserDto
    {
        public string Username { get; set; }
        public string Token { get; set; }
        public string PhotoUrl { get; set; } // main photo (see '11.134 Adding the main photo image to the nav bar' for details)

        public string KnownAs { get; set; } // see '12.148 Updating the API register method' for details
    }
}
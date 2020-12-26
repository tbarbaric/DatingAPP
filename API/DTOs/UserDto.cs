namespace API.DTOs
{
    // This is the object we're gonna return when a user logs/registers in
    public class UserDto
    {
        public string Username { get; set; }
        public string Token { get; set; }
    }
}
namespace API.Helpers
{
    // see '11.125 Configuring cloudinary in the API'
    
    public class CloudinarySettings
    {
        public string CloudName { get; set; }
        public string ApiKey { get; set; }
        public string ApiSecret { get; set; }
    }
}
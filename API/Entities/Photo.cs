using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Photos")]
    public class Photo
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public bool IsMain { get; set; }
        public string PublicId { get; set; }
        public AppUser AppUser { get; set; } // fully defining AppUser-Photo relationship; using EF conventions (see '8.86 Entity Framework relationships')
        public int AppUserId { get; set; } // fully defining AppUser-Photo relationship; using EF conventions (see '8.86 Entity Framework relationships')
    }
}
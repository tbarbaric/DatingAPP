using API.Entities;

namespace API.Interfaces
{
    /*
        To accomodate SRP (Single Responsability Principle), this service is solely responsible for the creation
        of JWT tokens. Issuing the token will be the job of our AccountController.
    */
    public interface ITokenService
    {
        string CreateToken(AppUser user);   
    }
}
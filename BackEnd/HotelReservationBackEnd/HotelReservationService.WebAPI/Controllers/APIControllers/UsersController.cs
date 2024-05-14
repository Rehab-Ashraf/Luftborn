#region Using ...
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using HotelReservationService.Core.IServices;
using HotelReservationService.Core.Models.ViewModels;
using System.Threading.Tasks;
using HotelReservationService.Core.Models.ViewModels.UserManagement.User;

#endregion


namespace HotelReservationService.WebAPI.Controllers.APIControllers
{
    /// <summary>
    /// Providing an API controller that holds 
    /// end points to manage operations over 
    /// type UsersController.
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        #region Data Members
        private readonly IUsersService _UsersService;
        #endregion

        #region Constructors
        public UsersController(
            IUsersService UsersService
            )
        {
            this._UsersService = UsersService;
        }
        #endregion

        #region Actions

        [AllowAnonymous]
        [Route("Login")]
        [HttpPost]
        public IActionResult LoginInternal(LoginViewModel model)
        {
            UserLoggedInViewModel user = this._UsersService.Login(model);
            if (user != null)
            {

                return Ok(user);
            }
            else
            {
                return BadRequest("0001");
            }
        }

        [AllowAnonymous]
        [Route("Register")]
        [HttpPost]
        public async Task<IActionResult> SignUp(UserInputModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var result = await this._UsersService.AddAsync(model);

            return Ok(result);
        }
        #endregion
    }
}

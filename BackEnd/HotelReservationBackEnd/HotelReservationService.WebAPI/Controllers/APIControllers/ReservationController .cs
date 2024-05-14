using Framework.Core.Models;
using HotelReservationService.Common.Enums;
using HotelReservationService.Core.IServices;
using HotelReservationService.Core.Models.ViewModels.Reservation;
using HotelReservationService.WebAPI.Auth;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HotelReservationService.WebAPI.Controllers.APIControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservationController : ControllerBase
    {
        #region Data Members
        private readonly IReservationService _reservationService;
        #endregion

        #region Constructors
        public ReservationController(
            IReservationService reservationService
            )
        {
            _reservationService = reservationService;
        }
        #endregion

        [Route("Add")]
        [HttpPost]
        [JwtAuthentication(Permissions.ReservationAdd)]
        public async Task<IActionResult> Add(ReservationViewModel reservation)
        {
            var reservationId = await _reservationService.AddAsync(reservation);
            return Ok(reservationId);
        }

        [HttpPost("GetAll")]
        [JwtAuthentication(Permissions.ReservationList)]
        public async Task<GenericResult<IList<ReservationLightViewModel>>> GetAll([FromBody]ReservationSearchModel model)
        {
            var reservations = await _reservationService.GetAllAsync(model);
            return reservations;
        }

        [HttpPut("{reservationId}")]
        [JwtAuthentication(Permissions.ReservationEdit)]
        public async Task<IActionResult> Edit(ReservationViewModel reservation)
        {
            var reservationId = await _reservationService.UpdateAsync(reservation);
            return Ok(reservationId);
        }

        [HttpDelete("{reservationId}")]
        [JwtAuthentication(Permissions.ReservationDelete)]
        public async Task<IActionResult> Delete(long reservationId)
        {
            await _reservationService.DeleteAsync(reservationId);
            return Ok(reservationId);
        }
    }
}

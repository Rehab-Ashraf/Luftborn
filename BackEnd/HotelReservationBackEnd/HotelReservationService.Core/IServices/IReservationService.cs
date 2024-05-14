using Framework.Core.Models;
using HotelReservationService.Core.Models.ViewModels;
using HotelReservationService.Core.Models.ViewModels.Reservation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HotelReservationService.Core.IServices
{
    public interface IReservationService
    {
        #region Methods
        Task ValidateModelAsync(ReservationViewModel model);
        Task<GenericResult<IList<ReservationLightViewModel>>> GetAllAsync(ReservationSearchModel model);
        Task<long> AddAsync(ReservationViewModel model);
        Task<long> UpdateAsync(ReservationViewModel model);
        Task DeleteAsync(long reservationId);
        #endregion
    }
}

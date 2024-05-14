using Framework.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HotelReservationService.Core.Models.ViewModels.Reservation
{
    public class ReservationSearchModel : BaseFilter
    {
        public long UserId { get; set; }
    }
}

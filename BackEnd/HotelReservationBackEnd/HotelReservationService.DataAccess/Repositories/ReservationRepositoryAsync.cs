using Framework.Core.Common;
using HotelReservationService.Core.IRepositories;
using HotelReservationService.DataAccess.Contexts;
using HotelReservationService.Entity.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HotelReservationService.DataAccess.Repositories
{
    public class ReservationRepositoryAsync : Base.BaseServiceRepositoryAsync<Reservation, long>, IReservationRepositoryAsync
    {
        #region Constructors
        public ReservationRepositoryAsync(HotelReservationServiceContext context, ICurrentUserService currentUserService)
            : base(context, currentUserService)
        {

        }
        #endregion
    }
}

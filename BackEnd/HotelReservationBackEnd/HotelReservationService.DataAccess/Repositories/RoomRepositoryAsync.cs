using Framework.Core.Common;
using HotelReservationService.Core.IRepositories;
using HotelReservationService.DataAccess.Contexts;
using HotelReservationService.Entity.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HotelReservationService.DataAccess.Repositories
{
    public class RoomRepositoryAsync : Base.BaseServiceRepositoryAsync<Room, long>, IRoomRepositoryAsync
    {
        #region Constructors
        public RoomRepositoryAsync(HotelReservationServiceContext context, ICurrentUserService currentUserService)
            : base(context, currentUserService)
        {

        }
        #endregion
    }
}

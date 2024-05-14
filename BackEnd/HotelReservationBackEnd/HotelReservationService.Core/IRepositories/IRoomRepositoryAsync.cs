using Framework.Core.IRepositories.Base;
using HotelReservationService.Entity.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HotelReservationService.Core.IRepositories
{
    public interface IRoomRepositoryAsync : IBaseFrameworkRepositoryAsync<Room, long>
    {
    }
}

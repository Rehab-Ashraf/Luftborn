using HotelReservationService.Common.Enums;
using HotelReservationService.Entity.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HotelReservationService.Core.Models.ViewModels.Reservation
{
    public class ReservationLightViewModel
    {
        public long Id { get; set; }
        public long UserId { get; set; }
        public long RoomId { get; set; }
        public DateTime DateFrom { get; set; }
        public DateTime DateTo { get; set; }
        public string UserName { get; set; }
        public string RoomNumber { get; set; }
        public ReservationStatus Status { get; set; }
    }
}

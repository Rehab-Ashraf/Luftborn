#region Using ...
using HotelReservationService.Core.Models.ViewModels;
using HotelReservationService.Core.Models.ViewModels.Reservation;
using HotelReservationService.Core.Models.ViewModels.UserManagement.User;
using HotelReservationService.Entity.Entities;
using Microsoft.AspNetCore.Builder;

#endregion


namespace HotelReservationService.Core
{
    public class Profile : AutoMapper.Profile
    {
        #region Properties
        public static IApplicationBuilder ApplicationBuilder { get; set; }
        #endregion


        #region Constructors
        public Profile()
        {
            #region User
            CreateMap<User, UserViewModel>()
               .ReverseMap();
            CreateMap<User, UserInputModel>()
               .ReverseMap();

            #endregion

            #region Reservation
            CreateMap<Reservation, ReservationViewModel>()
               .ReverseMap();
            CreateMap<Reservation, ReservationLightViewModel>()
               .ReverseMap();

            #endregion
        }

        #endregion
    }
}

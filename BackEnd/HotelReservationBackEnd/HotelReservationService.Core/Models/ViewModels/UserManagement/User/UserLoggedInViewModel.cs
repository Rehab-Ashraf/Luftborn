using System;
using System.Collections.Generic;
using System.Text;

namespace HotelReservationService.Core.Models.ViewModels
{
    public class UserLoggedInViewModel
    {
        public string access_token { get; set; }
        public string token_type { get; set; }
        public long expires_in { get; set; }
        public long Id { get; set; }
        public string UserName { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
  
        public string RoleName { get; set; }


        public DateTime? issued { get; set; }
        public DateTime? expires { get; set; }

    }
}

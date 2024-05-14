#region Using ...
using Framework.Common.Enums;
using HotelReservationService.Common.Enums;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
#endregion

namespace HotelReservationService.Core.Models.ViewModels
{
    public class CurrentUserViewModel
    {

        public long Id { get; set; }
        public System.String Name { get; set; }
    }
}

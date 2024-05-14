#region Using ...
using System;
using System.Collections.Generic;
using System.Text;
#endregion


namespace HotelReservationService.Common.Enums
{

	public enum ErrorCode
	{
		NotFoundUser = 1,
		NotFoundRoom = 2,
		RoomNotAvailable = 3,
        UserNameAlreadyExist = 4
    }
}

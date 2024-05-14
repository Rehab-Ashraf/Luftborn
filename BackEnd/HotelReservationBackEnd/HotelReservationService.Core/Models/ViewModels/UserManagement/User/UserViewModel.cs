

namespace HotelReservationService.Core.Models.ViewModels
{
    public class UserViewModel
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public long? RoleId { get; set; }
    }
}

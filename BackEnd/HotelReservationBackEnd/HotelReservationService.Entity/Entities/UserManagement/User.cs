#region Using ...
using Framework.Common.Enums;
using Framework.Common.Interfaces;
using HotelReservationService.Common.Enums;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
#endregion

namespace HotelReservationService.Entity.Entities
{
    public class User : IEntityIdentity<long>, IDateTimeSignature, IDeletionSignature
    {

        #region Properties

        #region IEntityIdentity<long>
        public long Id { get; set; }
        #endregion

        #region IDateTimeSignature
        public DateTime CreationDate { get; set; }
        public DateTime? FirstModificationDate { get; set; }
        public DateTime? LastModificationDate { get; set; }
        #endregion

        #region IEntityUserSignature
        public long? CreatedByUserId { get; set; }
        public long? FirstModifiedByUserId { get; set; }
        public long? LastModifiedByUserId { get; set; }
        #endregion

        #region IDeletionSignature
        public bool IsDeleted { get; set; }
        public DateTime? DeletionDate { get; set; }
        public long? DeletedByUserId { get; set; }
        public bool? MustDeletedPhysical { get; set; }
        #endregion

        public string Name{ get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        
        public bool IsActive { get; set; }
        public long RoleId { get; set; }
        public virtual Role Role { get; set; }
        public virtual ICollection<Reservation> Reservations { get; set; }
        #endregion
    }
}

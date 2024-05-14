#region Using ...
using Framework.Common.Interfaces;
using System.Collections.Generic;
#endregion


namespace HotelReservationService.Entity.Entities
{
    public class Role : IEntityIdentity<long>
    {
        #region Constructors
        /// <summary>
        /// Initializes a new instance from type
        /// Role
        /// </summary>
        public Role()
        {
            this.RolePermissions = new HashSet<RolePermission>();
        }

        #endregion

        #region Properties

        #region IEntityIdentity<long>
        public long Id { get; set; }
        #endregion

        public string Name{ get; set; }
        public virtual ICollection<User> Users { get; set; }
        public virtual ICollection<RolePermission> RolePermissions { get; set; }
        #endregion
    }
}

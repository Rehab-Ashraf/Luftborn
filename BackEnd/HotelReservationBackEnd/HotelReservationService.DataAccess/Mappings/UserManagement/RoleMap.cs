#region Using ...
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using HotelReservationService.Core.Common;
using HotelReservationService.Entity.Entities;
using HotelReservationService.DataAccess.Seed;
#endregion

namespace HotelReservationService.DataAccess.Mappings
{

	public class RoleMap :IEntityTypeConfiguration<Role>
	{
		#region Methods

		public void Configure(EntityTypeBuilder<Role> builder)
		{
			builder.ToTable($"{typeof(Role).Name}s", ApplicationGlobalConfig.Schema.UserManagementSchema);

			#region Configure Fields
			builder.Property(prop => prop.Name).HasMaxLength(200);
			#endregion
			#region Configure Relations
			builder.HasMany(many => many.RolePermissions)
				.WithOne(one => one.Role)
				.HasForeignKey(key => key.RoleId);

			#endregion

			#region Set Initial Data
			this.Seed(builder);
			#endregion
		}


		private void Seed(EntityTypeBuilder<Role> builder)
		{
            if (ApplicationGlobalConfig.EnableSeedOnMigration)
            {
                builder.HasData(RoleSeed.SeedList);
            }
        }
		#endregion
	}
}

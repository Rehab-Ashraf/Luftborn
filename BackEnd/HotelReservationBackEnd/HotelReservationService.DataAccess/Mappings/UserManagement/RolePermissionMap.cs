#region Using ...

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using HotelReservationService.Core.Common;
using HotelReservationService.Entity.Entities;
using HotelReservationService.DataAccess.Seed;
#endregion


namespace HotelReservationService.DataAccess.Mappings
{
	public class RolePermissionMap :IEntityTypeConfiguration<RolePermission>
	{
		#region Methods
		public void Configure(EntityTypeBuilder<RolePermission> builder)
		{
			builder.ToTable($"{typeof(RolePermission).Name}s", ApplicationGlobalConfig.Schema.UserManagementSchema);

			#region Set Initial Data
			this.Seed(builder);
			#endregion
		}
		private void Seed(EntityTypeBuilder<RolePermission> builder)
		{
			if (ApplicationGlobalConfig.EnableSeedOnMigration)
			{
				builder.HasData(RolePermissionSeed.SeedList);
			}
		}
		#endregion
	}
}

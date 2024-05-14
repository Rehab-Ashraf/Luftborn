#region Using ...
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using HotelReservationService.Core.Common;
using HotelReservationService.Entity.Entities;
using HotelReservationService.DataAccess.Seed;
#endregion


namespace HotelReservationService.DataAccess.Mappings
{
    public class PermissionMap :IEntityTypeConfiguration<Permission>
    {
        public static List<Permission> permissions;

        #region Methods
        public void Configure(EntityTypeBuilder<Permission> builder)
        {
            builder.ToTable($"{typeof(Permission).Name}s", ApplicationGlobalConfig.Schema.UserManagementSchema);

            builder.Property(prop => prop.Name).HasMaxLength(200);
            builder.HasIndex(prop => prop.Code);

            builder.HasMany(many => many.RolePermissions)
                .WithOne(one => one.Permission)
                .HasForeignKey(key => key.PermissionId);

            this.Seed(builder);
        }

        private void Seed(EntityTypeBuilder<Permission> builder)
        {
            if (ApplicationGlobalConfig.EnableSeedOnMigration)
            {
                builder.HasData(PermissionSeed.SeedList);
            }
        }

        #endregion
    }
}

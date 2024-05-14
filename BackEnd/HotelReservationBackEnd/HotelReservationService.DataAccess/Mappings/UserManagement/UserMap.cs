#region Using ...
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using HotelReservationService.Core.Common;
using HotelReservationService.DataAccess.Seed;
using HotelReservationService.Entity.Entities;
#endregion


namespace HotelReservationService.DataAccess.Mappings
{
	public class UserMap :IEntityTypeConfiguration<User>
	{
		public static List<User> Users;

		#region Methods
		public void Configure(EntityTypeBuilder<User> builder)
		{
			builder.ToTable($"{typeof(User).Name}s", ApplicationGlobalConfig.Schema.UserManagementSchema);

			#region Configure Fields
			builder.Property(prop => prop.Name).HasMaxLength(200);
			builder.Property(prop => prop.Email).HasMaxLength(200);
			builder.Property(prop => prop.Password).HasMaxLength(200);
			builder.Property(prop => prop.Username).HasMaxLength(200);
			builder.HasIndex(prop => prop.Username);
            #endregion

            #region Configure Relations
            builder.HasOne(many => many.Role)
                .WithMany(one => one.Users)
                .HasForeignKey(key => key.RoleId);

            #endregion

            this.Seed(builder);
		}
		private void Seed(EntityTypeBuilder<User> builder)
		{
			if (ApplicationGlobalConfig.EnableSeedOnMigration)
			{
				builder.HasData(UserSeed.SeedList);
			}
		}
		#endregion
	}
}

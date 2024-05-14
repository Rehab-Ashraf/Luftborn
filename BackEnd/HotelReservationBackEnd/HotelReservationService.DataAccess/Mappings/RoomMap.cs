#region Using ...
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using HotelReservationService.Core.Common;
using HotelReservationService.Entity.Entities;
using HotelReservationService.DataAccess.Seed;
#endregion

namespace HotelReservationService.DataAccess.Mappings
{
	public class RoomMap : IEntityTypeConfiguration<Room>
	{
		public void Configure(EntityTypeBuilder<Room> builder)
		{

            #region Set Initial Data
            this.Seed(builder);
            #endregion

        }

        private void Seed(EntityTypeBuilder<Room> builder)
		{
			if (ApplicationGlobalConfig.EnableSeedOnMigration)
			{

				builder.HasData(RoomSeed.SeedList);
			}
		}

	}
}

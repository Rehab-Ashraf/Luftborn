using HotelReservationService.Core.Common;
using HotelReservationService.Core.Helper;
using HotelReservationService.Entity.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace HotelReservationService.DataAccess.Seed
{
	public class UserSeed
	{

		static UserSeed()
		{
			Seed();
		}

		private static void Seed()
		{
			SeedList = new List<User>();

			if (ApplicationGlobalConfig.EnableSeedOnMigration)
			{

                DateTime now = new DateTime(2024, 5, 6, 13, 15, 24, 581, DateTimeKind.Local);


                List<User> entityList = new List<User>() {
				new User
				{
					Id = 1,
					CreationDate = now,
					Name = "admin",
					Username = "admin",
					IsActive = true,
					IsDeleted = false,
					Password = HashPass.HashPassword("P@ssw0rd"),
					RoleId = 1,
				},
				new User
				{
					Id = 2,
					CreationDate = now,
					Name = "User",
					Username = "User",
					IsActive = true,
					IsDeleted = false,
					Password = HashPass.HashPassword("123456"),
                    RoleId = 2,
                }

				};

				SeedList = entityList;
			}
		}

		public static List<User> SeedList { get; set; }
	}
}

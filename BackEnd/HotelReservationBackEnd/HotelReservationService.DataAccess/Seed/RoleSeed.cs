using HotelReservationService.Core.Common;
using HotelReservationService.Core.Helper;
using HotelReservationService.Entity.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HotelReservationService.DataAccess.Seed
{
    public class RoleSeed
    {
        static RoleSeed()
        {
            Seed();
        }

        private static void Seed()
        {
            SeedList = new List<Role>();

            if (ApplicationGlobalConfig.EnableSeedOnMigration)
            {
                List<Role> entityList = new List<Role>()
                {
                    new Role
                    {
                        Id = 1,
                        Name="Admin",
                    },
                    new Role
                    {
                        Id = 2,
                        Name="User",
                    },
                };

                SeedList = entityList;
            }
        }

        public static List<Role> SeedList { get; set; }
    }
}

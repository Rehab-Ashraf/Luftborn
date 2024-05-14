using HotelReservationService.Core.Common;
using HotelReservationService.Entity.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HotelReservationService.DataAccess.Seed
{
    public class RolePermissionSeed
    {
        static RolePermissionSeed()
        {
            Seed();
        }

        private static void Seed()
        {
            SeedList = new List<RolePermission>();

            if (ApplicationGlobalConfig.EnableSeedOnMigration)
            {

                DateTime now = new DateTime(2024, 5, 6, 13, 15, 24, 581, DateTimeKind.Local);


                List<RolePermission> entityList = new List<RolePermission>()
                {
                    new RolePermission
                    {
                        Id = 1,
                        RoleId = 1,
                        PermissionId = 1,
                    },
                    new RolePermission
                    {
                        Id = 2,
                        RoleId = 1,
                        PermissionId = 2,
                    },
                    new RolePermission
                    {
                        Id = 3,
                        RoleId = 1,
                        PermissionId = 3,
                    },
                    new RolePermission
                    {
                        Id = 4,
                        RoleId = 1,
                        PermissionId = 4,
                    },
                    new RolePermission
                    {
                        Id = 5,
                        RoleId = 1,
                        PermissionId = 5,
                    },
                    new RolePermission
                    {
                        Id = 6,
                        RoleId = 2,
                        PermissionId = 1,
                    },
                    new RolePermission
                    {
                        Id = 7,
                        RoleId = 2,
                        PermissionId = 2,
                    },
                    new RolePermission
                    {
                        Id = 8,
                        RoleId = 2,
                        PermissionId = 3,
                    },
                    new RolePermission
                    {
                        Id = 9,
                        RoleId = 2,
                        PermissionId = 4,
                    },
                    new RolePermission
                    {
                        Id = 10,
                        RoleId = 2,
                        PermissionId = 5,
                    },


                };

                SeedList = entityList;
            }
        }

        public static List<RolePermission> SeedList { get; set; }
    }
}

using HotelReservationService.Common.Enums;
using HotelReservationService.Core.Common;
using HotelReservationService.Entity.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HotelReservationService.DataAccess.Seed
{
    public class PermissionSeed
    {
        static PermissionSeed()
        {
            Seed();
        }

        private static void Seed()
        {
            SeedList = new List<Permission>();

            if (ApplicationGlobalConfig.EnableSeedOnMigration)
            {
                List<Permission> entityList = new List<Permission>()
                {
                    new Permission
                    {
                        Id = 1,
                        Name="Reservation Add",
                        Code = (int)Permissions.ReservationAdd
                    },
                    new Permission
                    {
                        Id = 2,
                        Name="Reservation Edit",
                        Code = (int)Permissions.ReservationEdit
                    },
                    new Permission
                    {
                        Id = 3,
                        Name="Reservation View",
                        Code = (int)Permissions.ReservationView
                    },
                    new Permission
                    {
                        Id = 4,
                        Name="Reservation List",
                        Code = (int)Permissions.ReservationList
                    },
                    new Permission
                    {
                        Id = 5,
                        Name="ReservationDelete",
                        Code = (int)Permissions.ReservationDelete
                    },

                };

                SeedList = entityList;
            }
        }

        public static List<Permission> SeedList { get; set; }
    }
}

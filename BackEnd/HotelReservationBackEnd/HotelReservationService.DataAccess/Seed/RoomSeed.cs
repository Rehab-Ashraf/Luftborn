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
    public class RoomSeed
    {
        static RoomSeed()
        {
            Seed();
        }

        private static void Seed()
        {
            SeedList = new List<Room>();

            if (ApplicationGlobalConfig.EnableSeedOnMigration)
            {
                List<Room> entityList = new List<Room>()
                {
                    new Room
                    {
                        Id = 1,
                        RoomNumber = "A1",
                    },
                    new Room
                    {
                        Id = 2,
                        RoomNumber = "A2",
                    },
                    new Room
                    {
                        Id = 3,
                       RoomNumber = "A3",
                    },
                    new Room
                    {
                        Id = 4,
                        RoomNumber = "B1",
                    },
                    new Room
                    {
                        Id = 5,
                        RoomNumber = "B2",
                    },
                    new Room
                    {
                        Id = 6,
                        RoomNumber = "B3",
                    },
                    new Room
                    {
                        Id = 7,
                        RoomNumber = "C1",
                    },
                    new Room
                    {
                        Id = 8,
                       RoomNumber = "C2",
                    },
                    new Room
                    {
                        Id = 9,
                        RoomNumber = "C3",
                    },
                    new Room
                    {
                        Id = 10,
                        RoomNumber = "D1",
                    },

                };

                SeedList = entityList;
            }
        }

        public static List<Room> SeedList { get; set; }
    }
}

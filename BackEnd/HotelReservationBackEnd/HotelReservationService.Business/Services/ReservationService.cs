using AutoMapper;
using Framework.Core.Common;
using Framework.Core.IRepositories;
using Framework.Core.Models;
using HotelReservationService.Core.IRepositories;
using HotelReservationService.Core.IServices;
using HotelReservationService.Core.Models.ViewModels.Reservation;
using System;
using System.Collections.Generic;
using HotelReservationService.Core;
using System.Threading.Tasks;
using Framework.Common.Exceptions;
using HotelReservationService.Common.Enums;
using System.Linq;
using Microsoft.Extensions.Hosting;
using HotelReservationService.Entity.Entities;

namespace HotelReservationService.Business.Services
{
    public class ReservationService : Base.BaseService, IReservationService
    {

        private readonly IMapper _mapper;
        private readonly IUnitOfWorkAsync _unitOfWorkAsync;
        private readonly IUsersRepositoryAsync _UsersRepositoryAsync;
        private readonly ICurrentUserService _currentUserService;
        private readonly IReservationRepositoryAsync _reservationRepositoryAsync;
        private readonly IRoomRepositoryAsync _roomRepositoryAsync;


        public ReservationService(
            IMapper mapper,
            IUnitOfWorkAsync unitOfWorkAsync,
            IUsersRepositoryAsync UsersRepositoryAsync,
            ICurrentUserService currentUserService,
            IRoomRepositoryAsync roomRepositoryAsync,
            IReservationRepositoryAsync reservationRepositoryAsync)
        {
            this._mapper = mapper;
            this._unitOfWorkAsync = unitOfWorkAsync;
            this._UsersRepositoryAsync = UsersRepositoryAsync;
            this._currentUserService = currentUserService;
            _reservationRepositoryAsync = reservationRepositoryAsync;
            _roomRepositoryAsync = roomRepositoryAsync;
        }
        public async Task<GenericResult<IList<ReservationLightViewModel>>> GetAllAsync(ReservationSearchModel searchModel)
        {
            var query = await this._reservationRepositoryAsync.GetAsync(null);
            query = query.Where(x=>x.UserId == searchModel.UserId);
            searchModel.Pagination = await this._reservationRepositoryAsync.SetPaginationCountAsync(query, searchModel.Pagination);

            query = await this._reservationRepositoryAsync.SetSortOrderAsync(query, searchModel.Sorting);

            query = await this._reservationRepositoryAsync.SetPaginationAsync(query, searchModel.Pagination);
            DateTime date = DateTime.Now;
            var entityList = query.Select(x => new ReservationLightViewModel
            {
                Id = x.Id,
                DateFrom = x.DateFrom,
                DateTo = x.DateTo,
                RoomId = x.RoomId,
                RoomNumber = x.Room.RoomNumber,
                UserId = x.UserId,
                UserName = x.User.Name,
                Status = ( x.DateFrom <= date)?ReservationStatus.Past: ReservationStatus.Upcoming

            }).ToList();
            var result = new GenericResult<IList<ReservationLightViewModel>>
            {
                Pagination = searchModel.Pagination,
                Collection = entityList
            };

            return result;
        }
        public async Task ValidateModelAsync(ReservationViewModel model)
        {
            await Task.Run(() =>
            {

                var existUser = this._UsersRepositoryAsync.GetAsync(null).Result.FirstOrDefault(entity =>
                        entity.Id == model.UserId && !entity.IsDeleted && entity.IsActive);
                if (existUser == null)
                    throw new ItemAlreadyExistException((int)ErrorCode.NotFoundUser);


                DateTime date = DateTime.Now;
                var existRoom = this._reservationRepositoryAsync.GetAsync(null).Result.FirstOrDefault(entity =>
                        entity.RoomId == model.RoomId && !entity.IsDeleted && (entity.DateTo >= date && entity.DateFrom <= date));


                if(existRoom != null)
                    throw new ItemAlreadyExistException((int)ErrorCode.RoomNotAvailable);
            });
        }
        public async Task<long> AddAsync(ReservationViewModel model)
        {
            await this.ValidateModelAsync(model);
            var entity = model.ToEntity(this._mapper);
            entity.CreatedByUserId = _currentUserService.CurrentUserId;
            entity = await this._reservationRepositoryAsync.AddAsync(entity);

            try
            {
                #region Commit Changes
                await this._unitOfWorkAsync.CommitAsync();
                #endregion
            }catch(Exception ex)
            {

            }

            var result = entity.ToModel(this._mapper);
            return result.Id;
        }
        public async Task<long> UpdateAsync(ReservationViewModel model)
        {
            var entity = model.ToEntity(_mapper);
            #region Select Existing Entity
            var existEntity = await this._reservationRepositoryAsync.FirstOrDefaultAsync(x => x.Id == model.Id);
            #endregion

            await _reservationRepositoryAsync.UpdateAsync(existEntity);
            await _unitOfWorkAsync.CommitAsync();
            var result = entity.ToModel(this._mapper);
            return result.Id;
        }
        public async Task DeleteAsync(long reservationId)
        {
            await this._reservationRepositoryAsync.DeleteAsync(reservationId);
            #region Commit Changes
            await this._unitOfWorkAsync.CommitAsync();
            #endregion
        }
    }
}

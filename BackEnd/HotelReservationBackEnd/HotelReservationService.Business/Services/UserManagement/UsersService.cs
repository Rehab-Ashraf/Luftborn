#region Using ...
using AutoMapper;
using HotelReservationService.Common.Enums;
using HotelReservationService.Core;
using HotelReservationService.Core.Common;
using HotelReservationService.Core.Helper;
using HotelReservationService.Core.IRepositories;
using HotelReservationService.Core.IServices;
using HotelReservationService.Core.Models.ViewModels;
using Framework.Common.Exceptions;
using Framework.Core.Common;
using Framework.Core.IRepositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using HotelReservationService.Core.Models.ViewModels.UserManagement.User;
#endregion


namespace HotelReservationService.Business.Services
{
    public class UsersService : Base.BaseService, IUsersService
    {

        private readonly IMapper _mapper;
        private readonly IUnitOfWorkAsync _unitOfWorkAsync;
        private readonly IUsersRepositoryAsync _UsersRepositoryAsync;
        private readonly IRolesRepositoryAsync _rolesRepositoryAsync;
        private readonly ICurrentUserService _currentUserService;
        private readonly IJwtService _jwtService;



        public UsersService(
            IMapper mapper,
            IUnitOfWorkAsync unitOfWorkAsync,
            IUsersRepositoryAsync UsersRepositoryAsync,
            ICurrentUserService currentUserService,
            IRolesRepositoryAsync rolesRepositoryAsync,
            IJwtService jwtService)
        {
            this._mapper = mapper;
            this._unitOfWorkAsync = unitOfWorkAsync;
            this._UsersRepositoryAsync = UsersRepositoryAsync;
            this._currentUserService = currentUserService;
            _jwtService = jwtService;
            _rolesRepositoryAsync = rolesRepositoryAsync;
        }

        public async Task ValidateModelAsync(UserInputModel model)
        {
            await Task.Run(() =>
            {

                var existEntity = this._UsersRepositoryAsync.GetAsync(null).Result.FirstOrDefault(entity =>
                        (entity.Username == model.Username || entity.Email == model.Email) &&
                        entity.Id != model.Id && entity.IsDeleted != true);

                if (existEntity != null)
                    throw new ItemAlreadyExistException((int)ErrorCode.UserNameAlreadyExist);
            });
        }

        public async Task<UserInputModel> AddAsync(UserInputModel model)
        {

            await this.ValidateModelAsync(model);
            var entity = model.ToInputEntity(this._mapper);
            entity.CreatedByUserId = _currentUserService.CurrentUserId;
            entity.Password = HashPass.HashPassword(model.Password);
            var role = await _rolesRepositoryAsync.FirstOrDefaultAsync(x => x.Name.Contains("User"));
            entity.RoleId = role != null ? role.Id : 2;
            entity.IsActive = true;
            entity = await this._UsersRepositoryAsync.AddAsync(entity);
            

            #region Commit Changes
            await this._unitOfWorkAsync.CommitAsync();
            #endregion
            var result = entity.ToInputModel(this._mapper);
            return result;
        }

        private static bool VerifyHashedPassword(string hashedPassword, string password)
        {
            //return hashedPassword == password;

            byte[] buffer4;
            if (hashedPassword == null)
            {
                return false;
            }
            if (password == null)
            {
                throw new ArgumentNullException("password");
            }
            byte[] src = Convert.FromBase64String(hashedPassword);
            if ((src.Length != 0x31) || (src[0] != 0))
            {
                return false;
            }
            byte[] dst = new byte[0x10];
            Buffer.BlockCopy(src, 1, dst, 0, 0x10);
            byte[] buffer3 = new byte[0x20];
            Buffer.BlockCopy(src, 0x11, buffer3, 0, 0x20);
            using (Rfc2898DeriveBytes bytes = new Rfc2898DeriveBytes(password, dst, 0x3e8))
            {
                buffer4 = bytes.GetBytes(0x20);
            }
            return ByteArraysEqual(buffer3, buffer4);
        }
        private static bool ByteArraysEqual(byte[] firstHash, byte[] secondHash)
        {
            int _minHashLength = firstHash.Length <= secondHash.Length ? firstHash.Length : secondHash.Length;
            var xor = firstHash.Length ^ secondHash.Length;
            for (int i = 0; i < _minHashLength; i++)
                xor |= firstHash[i] ^ secondHash[i];
            return 0 == xor;
        }
        public UserLoggedInViewModel Login(LoginViewModel model)
        {

            UserLoggedInViewModel viewModel = new UserLoggedInViewModel();
            var user = this._UsersRepositoryAsync.Login(model.UserName);

            if (user != null)
            {

                if (VerifyHashedPassword(user.Password, model.Password))
                {
                    viewModel.Id = user.Id;
                    viewModel.UserName = user.Username;
                    viewModel.token_type = "Bearer";
                    viewModel.issued = DateTime.Now;
                    viewModel.PhoneNumber = user.PhoneNumber;
                    viewModel.Email = user.Email;
                    viewModel.Name = user.Name;
                    viewModel.RoleName = user?.Role?.Name;


                    // Getting permissions
                    HashSet<int> PermissionsHashSet = new HashSet<int>();

                    List<int> Permissions = _UsersRepositoryAsync.GetAsync(null).Result
                        .Where(x => x.Id == user.Id)
                        .SelectMany(x => x.Role.RolePermissions.Select(h => h.Permission.Code))
                        .ToList();

                    // Adding to hashset to eliminate duplicates
                    foreach (var permission in Permissions)
                    {
                        PermissionsHashSet.Add(permission);
                    }
                    Permissions = PermissionsHashSet.ToList();

                    StringBuilder stringBuilder = new StringBuilder();
                    string userPermissions = string.Empty;
                    for (int i = 0; i < Permissions.Count; i++)
                    {
                        stringBuilder.Append(Permissions[i]);
                        if (i < Permissions.Count - 1) stringBuilder.Append(',');
                    }
                    userPermissions = stringBuilder.ToString();
                    viewModel.access_token = _jwtService.GenerateJWTToken(user.Id.ToString(), userPermissions);

                    return viewModel;
                }
                else
                {


                    return null;
                }
            }
            else // login false
            {

                return null;
            }

        }






    }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PermissionEnum } from '../enum/permission-enum';
import { NavItemModel } from '../models/nav-item-model';
import { UserLoggedIn } from '../models/user-login.model';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  currentUser: UserLoggedIn | null = null;

  constructor() {}
  getNavItems(): Observable<NavItemModel[]> {
    this.navList = [];
    let item = localStorage.getItem('currentUser');
    let user: UserLoggedIn = item != null ? JSON.parse(item) : null;

    return new Observable(sub => {
      this.navList.push({
        order: 1,
        link: `/dashboard`,
        name: 'menu.dashboard',
        title: 'menu.dashboard',
        icon: '',
        img: '../../../assets/media/nav/dashboard-active.svg',
        cssClass: 'active',
        childs: [],
        data: { permissionCodes: [+PermissionEnum.ReservationList] },
      });
      sub.next(this.navList);

    });
  }
  navList: NavItemModel[] = [];
}

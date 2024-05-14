import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from 'src/app/modules/users/services/user.service';
import { NavItemModel } from 'src/app/sharedFeatures/models/nav-item-model';
import { UserLoggedIn } from 'src/app/sharedFeatures/models/user-login.model';
import { AuthGuard } from 'src/app/sharedFeatures/services/auth-guard.service';
import { CurrentUserService } from 'src/app/sharedFeatures/services/current-user.service';
import { LanguageService } from 'src/app/sharedFeatures/services/language';
import { NavigationService } from 'src/app/sharedFeatures/services/navigation.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent implements OnInit {
  activeClass: boolean = false;
  navList: NavItemModel[] = [];
  lang: string = 'ar';

  domainUrl: string = this._UsersService.domainUrl;
  currentUser: UserLoggedIn | null = null;
  activeChildClass: boolean = true;
  activeChild2Class: boolean = true;
  constructor(
    private navigationService: NavigationService,
    public adminGuard: AuthGuard,
    private translateService: TranslateService,
    private _UsersService: UserService,
    public languageService: LanguageService,
    private router: Router,
    private currentUserService: CurrentUserService
  ) {}

  ngOnInit(): void {
    this.openMenu();
    this.getNavItems();
    this.currentUser = this.currentUserService.getCurrentUser();
  }
  onMenuItemContainerClick(item: any): void {
    this.navList.forEach(el => {
      el.activeClass = false;
      el.childs.forEach(el2 => {
        el2.activeClass = false;
        el2.childs.forEach(el3 => {
          el3.activeClass = false;
        });
      });
    });
    setTimeout(() => {
      if (!item.activeClass) item.activeClass = true;
    }, 0);
  }
  onMenuSubItemContainerClick(item: any, subItem: any): void {
    this.navList.forEach(el => {
      el.activeClass = false;
      el.childs.forEach(el2 => {
        el2.activeClass = false;
        el2.childs.forEach(el3 => {
          el3.activeClass = false;
        });
      });
    });
    setTimeout(() => {
      if (!item.activeClass) item.activeClass = true;

      if (!subItem.activeClass) subItem.activeClass = true;
    }, 0);
  }
  onMenuThirdItemContainerClick(item: any, subItem: any, thirdItem: any): void {
    this.navList.forEach(el => {
      el.activeClass = false;
      el.childs.forEach(el2 => {
        el2.activeClass = false;
        el2.childs.forEach(el3 => {
          el3.activeClass = false;
        });
      });
    });
    setTimeout(() => {
      if (!item.activeClass) item.activeClass = true;

      if (!subItem.activeClass) subItem.activeClass = true;

      if (!thirdItem.activeClass) thirdItem.activeClass = true;
    }, 0);
  }
  openChildMenu() {
    if (this.activeChildClass == true) {
      let header = document.getElementById('header');
      header?.classList.add('width-mod');
      let main = document.getElementById('main-wrapper');
      main?.classList.add('width-mod');
    } else {
      let header = document.getElementById('header');
      header?.classList.remove('width-mod');
      let element = document.getElementById('main-wrapper');
      element?.classList.remove('width-mod');
      this.navList.filter(a => (a.activeClass = false));
    }
  }
  openChild2Menu() {
    if (this.activeChild2Class == true) {
      let header = document.getElementById('header');
      header?.classList.add('width-mod');
      let main = document.getElementById('main-wrapper');
      main?.classList.add('width-mod');
    } else {
      let header = document.getElementById('header');
      header?.classList.remove('width-mod');
      let element = document.getElementById('main-wrapper');
      element?.classList.remove('width-mod');
      this.navList.filter(a => (a.activeClass = false));
    }
  }
  getNavItems() {
    this.navigationService.getNavItems().subscribe(res => {
      this.navList = res.sort(c => c.order);
    });
  }
  viewUser() {
    let url = '/users/view/' + this.currentUser?.id + '/1';
    this.router.navigate([url]);
  }
  showParentActivate(list: any[]): boolean {
    var hasAnyPermission = false;
    list.forEach(elements => {
      var hasPermission = this.adminGuard.showActivate(elements.data);
      if (hasPermission == true) hasAnyPermission = true;
    });
    return hasAnyPermission;
  }
  mouseenter() {
    this.activeClass = !this.activeClass;
    this.openMenu();
  }
  openMenu() {
    if (this.activeClass == true) {
      let header = document.getElementById('header');
      header?.classList.add('width-mod');
      let main = document.getElementById('main-wrapper');
      main?.classList.add('width-mod');
    } else {
      let header = document.getElementById('header');
      header?.classList.remove('width-mod');
      let element = document.getElementById('main-wrapper');
      element?.classList.remove('width-mod');
      this.navList.filter(a => (a.activeClass = false));
    }
  }
  changeLang(lang: string) {
    this.translateService.use(lang);
    localStorage.setItem('currentLang', lang);

    this.languageService.setLanguage(lang);
  }
}

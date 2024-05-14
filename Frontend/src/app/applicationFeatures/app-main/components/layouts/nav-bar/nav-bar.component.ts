
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/sharedFeatures/services/language';
import { UserService } from 'src/app/modules/users/services/user.service';
import { UserLoggedIn } from 'src/app/sharedFeatures/models/user-login.model';
import { CurrentUserService } from '../../../../../sharedFeatures/services/current-user.service';
import { NotificationService } from 'src/app/sharedFeatures/services/notification.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  lang: string = 'ar';
  currentUser: UserLoggedIn | null = null;
  domainUrl: string = this._UsersService.domainUrl;

  constructor(
    private currentUserService: CurrentUserService,
    private router: Router,
    private notificationService: NotificationService,

    private _UsersService: UserService,
    private translateService: TranslateService,
    public languageService: LanguageService
  ) {}

  ngOnInit(): void {
    this.lang = this.translateService.currentLang;
    this.currentUser = this.currentUserService.getCurrentUser();
    //this.getNotificationsByUserId();
    //this.getCountUnSeenNotifications();

    if (this.currentUser == null) {
      this.router.navigate(['/login']);
    }
  }
  DismissNotificationMinue() {
    document.querySelector('#content')!.addEventListener('click', event => {
      const notificationCard: any = document.querySelector('#notificationCard');
      const withinBoundaries = event.composedPath().includes(notificationCard);
      if (withinBoundaries) {
        notificationCard.style.top = '71px';
      } else {
        notificationCard.style.top = '-150%';
        document
          .querySelector('.active-notification')
          ?.classList.remove('active-notification');
      }
    });
  }



  onScrollDown(s: any) {

  }

  goToLink(url: string) {
    if (url != null) {
      if (url?.includes('http')) {
        window.open(url, '_blank');
      } else {
        this.router.navigate([url]);
      }
    }
  }

  userLogout() {
    this.currentUserService.logOut();
    this.router.navigate(['/login']);
  }
  viewUser() {
    let url = '/users/view/' + this.currentUser?.id + '/1';
    this.router.navigate([url]);
  }
  changeLang(lang: string) {
    this.translateService.use(lang);
    localStorage.setItem('currentLang', lang);

    this.languageService.setLanguage(lang);
  }
  isOpenMessage: boolean = false;

  UnSeenNotifications: number = 0;
  pageIndex = 0;
  pageSize = 10;
}

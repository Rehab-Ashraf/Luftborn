import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/sharedFeatures/services/language';
import { HubNotifictionService } from 'src/app/sharedFeatures/services/HubNotifiction.service';
import { NavItemModel } from '../../../../sharedFeatures/models/nav-item-model';
import { UserLoggedIn } from '../../../../sharedFeatures/models/user-login.model';
import { CurrentUserService } from '../../../../sharedFeatures/services/current-user.service';
import { NavigationService } from '../../../../sharedFeatures/services/navigation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'HotelReservationAPP';
  directionRTL: boolean = true;
  navList: NavItemModel[] = [];
  isMenuCollapsed: boolean = false;
  isNavigating: boolean = false;
  currentUser: UserLoggedIn | null = null;

  constructor(
    public translateService: TranslateService,
    public HubNotifictionService: HubNotifictionService,
    private currentUserService: CurrentUserService,
    private router: Router,
    public languageService: LanguageService,
    private navigationService: NavigationService
  ) {
    translateService.addLangs(['en', 'ar']);
    var currentLang = localStorage.getItem('currentLang');
    if (currentLang != null && currentLang != 'null') {
      this.languageService.setLanguage(currentLang);
      this.translateService.use(currentLang);
    } else {
      this.languageService.setLanguage('en');
      translateService.use('en');
    }
  }

  ngOnInit(): void {
    this.HubNotifictionService.startConnection();
    this.HubNotifictionService.addDataSetReviewListener();
    this.HubNotifictionService.addNEBTReviewListener();

    this.router.events.subscribe(() => {
      this.currentUser = this.currentUserService.getCurrentUser();
      this.HubNotifictionService.userId = this.currentUser?.id;
    });
  }
  getNavItems() {
    this.navigationService.getNavItems().subscribe(res => {
      this.navList = res;
    });
  }

  goTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  switchLang(lang: string) {
    this.translateService.use(lang);
    localStorage.setItem('currentLang', lang);
  }
}

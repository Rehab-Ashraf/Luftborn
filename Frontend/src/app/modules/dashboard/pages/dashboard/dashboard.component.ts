import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashBoardService } from '../../services/dashboard.service';
import { CurrentUserService } from 'src/app/sharedFeatures/services/current-user.service';
import { UserLoggedIn } from 'src/app/sharedFeatures/models/user-login.model';
import { SelectItem } from 'primeng/api';
import { PageTitleService } from 'src/app/sharedFeatures/services/page-title.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  currentUser: UserLoggedIn | null = null;
  dropdownOptions: SelectItem[];
  selectedOption: any;

  public constructor(
    private dashBoardService: DashBoardService,
    private router: Router,
    private currentUserService: CurrentUserService,
    private pageTitle: PageTitleService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.currentUserService.getCurrentUser();
    this.setPageTitle();
    this.dropdownOptions = [
      { label: 'Today', value: 'Today' },
      { label: 'Monthly', value: 'Monthly' },
      { label: 'Yearly', value: 'Yearly' },
    ];
  }
  setPageTitle(): void {
    this.pageTitle.setTitleTranslated(`AppName`);
  }
}

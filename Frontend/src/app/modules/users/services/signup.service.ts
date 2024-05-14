import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { BaseHttpServiceService } from '../../../sharedFeatures/services/base-http-service.service';
import { CurrentUserService } from '../../../sharedFeatures/services/current-user.service';
import { UserViewModel } from '../models/user-model';
import { SignUp } from '../models/signup';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class SignUpService extends BaseHttpServiceService {
  constructor(
    http: HttpClient,
    translateService: TranslateService,
    currentUserService: CurrentUserService
  ) {
    super(http, translateService, currentUserService);
  }

  signup(item: SignUp): Observable<UserViewModel> {
    let url: string = `${this.baseUrl}/Users/Register`;
    return this.postData<UserViewModel>(url, item);
  }
}

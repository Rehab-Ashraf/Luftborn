import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { GenericResultModel } from 'src/app/sharedFeatures/models/generic-result.model';
import { BaseHttpServiceService } from 'src/app/sharedFeatures/services/base-http-service.service';
import { CurrentUserService } from 'src/app/sharedFeatures/services/current-user.service';

@Injectable({
  providedIn: 'root',
})
export class DashBoardService extends BaseHttpServiceService {
  private controller: string = `${this.baseUrl}/chart`;

  constructor(
    http: HttpClient,
    translateService: TranslateService,
    currentUserService: CurrentUserService
  ) {
    super(http, translateService, currentUserService);
  }

  public get(model: any): Observable<GenericResultModel<any[]>> {
    let url: string = `${this.controller}/dashboard`;
    return this.postData<GenericResultModel<any[]>>(url, model);
  }
}

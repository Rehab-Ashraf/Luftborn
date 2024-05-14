import { environment } from './../../../environments/environment';
import { LanguageService } from './language';
import { NotificationReturn } from './../models/Notifiction.model';
import { NotificationService } from './notification.service';
import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Language } from '../models/language.enum';
@Injectable({
  providedIn: 'root',
})
export class HubNotifictionService {
  public data!: NotificationReturn;
  private hubConnection!: signalR.HubConnection;
  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(environment.APIUrl + '/notifyEDMSHub', {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .build();
    this.hubConnection
      .start()
      .then()
      .catch((err: string) => {});
  };
  constructor(
    public Notification: NotificationService,
    private _languageService: LanguageService
  ) {}
  public addDataSetReviewListener() {
    this.hubConnection.on('DatasetReview', data => {
      this.data = data;
      if (data.userId == this.userId) {
        console.log(this.data);
        if (this._languageService.getLanguage == 'en') {
          this.Notification.showInfo(this.data.dataEn, 'dataset Review');
        } else this.Notification.showInfo(this.data.dataAr, 'dataset Review');
      }
    });
  }
  public addNEBTReviewListener() {
    this.hubConnection.on('NEBTReview', data => {
      this.data = data;
      if (data.userId == this.userId) {
        if (this._languageService.getLanguage == 'en')
          this.Notification.showInfo(this.data.dataEn, 'dataset Review');
        else this.Notification.showInfo(this.data.dataAr, 'dataset Review');
      }
    });
  }
  public userId: number;
}

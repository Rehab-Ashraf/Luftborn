
import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  NgModel,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { NotificationService } from '../../../../sharedFeatures/services/notification.service';
import { UserViewModel } from '../../models/user-model';
import { PageTitleService } from '../../../../sharedFeatures/services/page-title.service';
import { SignUp } from '../../models/signup';
import { SignUpService } from '../../services/signup.service';
import { LanguageService } from 'src/app/sharedFeatures/services/language';
import { countries } from 'src/app/applicationFeatures/shared-components/components/code-list/countries';
import { OTP } from '../../models/otp';
import * as bootstrap from 'bootstrap';
import {
  SearchCountryField,
  CountryISO
} from "ngx-intl-tel-input";
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignUpComponent implements OnInit, OnDestroy, AfterViewInit {
  language!: string;
  public countries: any = countries;
  signupForm!: FormGroup;
  subscriptionTranslate!: Subscription;
  currentUser: UserViewModel | null = null;
  subscriptions: Subscription[] = [];
  hidePassword: boolean = true;
  ChangeDetictionForceUpdateVar: boolean[] = [this.hidePassword];

  private modalInstance: any;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  preferredCountries: CountryISO[] = [CountryISO.Qatar];
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private translateService: TranslateService,
    public languageService: LanguageService,
    private notificationService: NotificationService,
    private signupService: SignUpService,
    private pageTitle: PageTitleService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  changeLang(lang: string) {
    this.translateService.use(lang);
    localStorage.setItem('currentLang', lang);
    this.languageService.setLanguage(lang);
  }
  ngOnInit(): void {
    this.setPageTitle();
    this.buildForm();
    this.setLanguageSubscriber();
  }
  ngAfterViewInit(): void {
    
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
  hidePasswordIcon() {
    this.hidePassword = !this.hidePassword;
    this.ChangeDetictionForceUpdateVar = [this.hidePassword];
    this.changeDetectorRef.detectChanges();
  }

  submit(): void {
    console.log(this.signupForm)
    if (this.signupForm.valid) {
      let SignUpComponentModel: SignUp = {
        name: this.signupForm.controls['name'].value,
        phoneNumber: this.signupForm.controls['phoneNumber'].value?.dialCode + this.signupForm.controls['phoneNumber'].value?.nationalNumber,
        email: this.signupForm.controls['email'].value,
        password: this.signupForm.controls['password'].value,
        confirmpassword: this.signupForm.controls['confirmpassword'].value,
        username: this.signupForm.controls['email'].value,
        //countryCode:
      };
      this.subscriptions.push(
        this.signupService.signup(SignUpComponentModel).subscribe(
          (res: any) => {
            this.currentUser = res;
            debugger;
            localStorage.setItem('currentUserId', res.id);
            this.router.navigate(['/login']);
          },
          (error: any) => {
            console.log('FormErrors' + JSON.stringify(error));
            debugger;
            if (error.status == 500) {
              this.notificationService.showErrorTranslated(
                `error.${error.error}`,
                ''
              );
            } else {
              this.notificationService.showErrorTranslated(
                `error.${error.error}`,
                ''
              );
            }
          },
          () => {}
        )
      );
    } else {
      const signupFormFormKeys = Object.keys(this.signupForm.controls);
      signupFormFormKeys.forEach(control => {
        this.signupForm.controls[control].markAsTouched();
      });
    }
  }
  buildForm(): void {
    this.signupForm = this.fb.group(
      {
        name: [
          null,
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(200),
          ],
        ],
        email: [null, [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmpassword: ['', Validators.required],
        phoneNumber: ['', [Validators.required]],
      },
      {
        validator: this.mustMatch('password', 'confirmpassword'),
      }
    );
  }
  private mustMatch(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];

      if (
        confirmPasswordControl.errors &&
        !confirmPasswordControl.errors['mustMatch']
      ) {
        // return if another validator has already found an error on the confirmPasswordControl
        return;
      }

      // Set error on confirmPasswordControl if validation fails
      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ mustMatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    };
  }
  setLanguageSubscriber(): void {
    this.language = this.translateService.currentLang;
    this.subscriptionTranslate = this.translateService.onLangChange.subscribe(
      val => {
        this.language = val.lang;
      },
      error => {},
      () => {}
    );
    this.subscriptions.push(this.subscriptionTranslate);
  }
  setPageTitle(): void {
    this.pageTitle.setTitleTranslated(`signup.Title`);
  }

  getControl(controlName: string): any {
    return this.signupForm?.controls[controlName];
  }

}

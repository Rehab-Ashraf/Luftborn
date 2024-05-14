import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedComponentModule } from '../../applicationFeatures/shared-components/shared-components.module';
import { SharedCommonModuleModule } from 'src/app/applicationFeatures/shared-common-module/shared-common-module.module';
import { SignUpComponent } from './components/sign-up/signup.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';


@NgModule({
  declarations: [
    SignUpComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedComponentModule,
    SharedCommonModuleModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
		NgxIntlTelInputModule
  ],
})
export class UsersModule {}

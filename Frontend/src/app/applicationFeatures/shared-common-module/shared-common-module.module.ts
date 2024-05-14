import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedCommonModuleRoutingModule } from './shared-common-module-routing.module';
import { HasPermissionDirective } from 'src/app/sharedFeatures/directives/HasPermission';
import { HasNotPermissionDirective } from 'src/app/sharedFeatures/directives/HasNotPermission';
import { LoaderModule } from '../loader/loader.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SearchPipe } from 'src/app/sharedFeatures/directives/SearchPipe';

@NgModule({
  declarations: [HasPermissionDirective, HasNotPermissionDirective, SearchPipe],
  imports: [
    CommonModule,
    SharedCommonModuleRoutingModule,
    LoaderModule,
    TranslateModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    HasPermissionDirective,
    HasNotPermissionDirective,
    SearchPipe,
    LoaderModule,
    TranslateModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class SharedCommonModuleModule {}

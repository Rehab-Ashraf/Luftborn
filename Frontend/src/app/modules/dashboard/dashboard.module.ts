import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedComponentModule } from 'src/app/applicationFeatures/shared-components/shared-components.module';
import { SharedCommonModuleModule } from './../../applicationFeatures/shared-common-module/shared-common-module.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    SharedCommonModuleModule,
    DashboardRoutingModule,
    SharedComponentModule,
  ],
})
export class DashboardModule {}

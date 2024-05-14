import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ControlErrorDisplayComponent } from './components/control-error-display/control-error-display.component';
import { SharedCcomponentRoutingModule } from './shared-components-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { PaginationComponent } from './components/pagination/pagination.component';
import { DeleteModalComponent } from './components/delete-modal/delete-modal.component';
import { GridComponent } from './components/grid/grid.component';
import { EnumFilterComponent } from './components/grid/enum-filter/enum-filter.component';
import { GroupByMenuComponent } from './components/grid/group-by-menu/group-by-menu.component';
import { CustomInputComponent } from './components/custom-input/custom-input.component';
import { CustomDropdwnComponent } from './components/custom-dropdwn/custom-dropdwn.component';

/** <--- Prime Ng ---> */
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { MenuModule } from 'primeng/menu';
import { MultiSelectModule } from 'primeng/multiselect';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { MapLeafletComponent } from './components/map-leaflet/map-leaflet.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { CalendarComponent } from './components/calendar/calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
/** <--- Prime Ng ---> */

const PRIM_MODULES = [
  FormsModule,
  TableModule,
  InputTextModule,
  DropdownModule,
  MultiSelectModule,
  ButtonModule,
  CalendarModule,
  ContextMenuModule,
  DialogModule,
  ProgressBarModule,
  MenuModule,
  CheckboxModule,
  OverlayPanelModule,
  DynamicDialogModule,
];

@NgModule({
  declarations: [
    ControlErrorDisplayComponent,
    PaginationComponent,
    DeleteModalComponent,
    GridComponent,
    GroupByMenuComponent,
    EnumFilterComponent,
    CustomInputComponent,
    CustomDropdwnComponent,
    MapLeafletComponent,
    CalendarComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule,
    SharedCcomponentRoutingModule,
    LeafletModule,
    ...PRIM_MODULES,
    FullCalendarModule,
  ],
  exports: [
    ControlErrorDisplayComponent,
    PaginationComponent,
    DeleteModalComponent,
    GridComponent,
    GroupByMenuComponent,
    EnumFilterComponent,
    CustomInputComponent,
    CustomDropdwnComponent,
    MapLeafletComponent,
    LeafletModule,
    ...PRIM_MODULES,
    CalendarComponent,
  ],
  providers: [MessageService, DialogService],
})
export class SharedComponentModule {}

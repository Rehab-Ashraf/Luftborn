import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { FilterMetadata, MenuItem, PrimeNGConfig, SortMeta } from 'primeng/api';
import { Table } from 'primeng/table';

import { EnumFilterComponent } from './enum-filter/enum-filter.component';
import { ITableHeader } from 'src/app/sharedFeatures/models/itable-header';
import { TableHeaderType } from 'src/app/sharedFeatures/enum/table/table-header-type';
import { TableViewMood } from 'src/app/sharedFeatures/enum/table/table-view-mode';
import { hasProperty } from 'src/app/sharedFeatures/functions/key-at-list-check';
import { groupBy } from 'src/app/sharedFeatures/functions/group-column-by';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from 'src/app/modules/users/services/user.service';

@Component({
  selector: 'msn-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements OnInit {
  @Input() columns: ITableHeader[] = [];
  @Input() data: any[];
  @Input() actions: MenuItem[] = [];
  @Input() selectedRecords: any[] = [];
  @Input() pageIndex: number = 0;
  @Input() paginator: boolean = true;
  @Input() sortable: boolean = true;
  @Input() canSelect: boolean = false;
  @Input() showGroupMenu: boolean = false;
  @Input() pageSize: number = 6;
  @Input() rowsPerPageOptions: number[] = [5, 10, 20, 50];
  @Input() totalRecordsLength: number;
  @Input() selectionMode: string;
  @Input() styleClass: string = 'p-datatable-gridlines';
  @Input() moduleTitle: string;

  @Input() actionButtonClass: string =
    'aube-btn-outline rounded-circle btn-color-lightblue';
  @Input() scrollable: boolean;
  @Input() responsive: boolean = false;

  @Output() filterChanged: EventEmitter<{
    [s: string]: FilterMetadata[];
  }> = new EventEmitter<{ [s: string]: FilterMetadata[] }>();

  @Output() showGroupMenuChange: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  @Output() pageIndexChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() pageSizeChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() sortChanged: EventEmitter<SortMeta[]> = new EventEmitter<
    SortMeta[]
  >();

  @Output() selectedRecordsChanged: EventEmitter<any[]> = new EventEmitter<
    any[]
  >();

  @ViewChild('ADVGrid') ADVGrid: Table;
  @ViewChildren(EnumFilterComponent)
  enumFilters: QueryList<EnumFilterComponent>;

  dataList: any[];
  groupedData: any;
  recordKey: string = '';
  currentPageReportTemplate: string = '';
  groupColumnsOptions: any[];
  propertyGetters: ((item: any) => any)[]; // usedIn Grouping
  selectedGroupByCol: any[];
  viewMood: TableViewMood = TableViewMood.RecordsView;

  TableHeaderType = TableHeaderType;
  TableViewMood = TableViewMood;
  domainUrl: string = this.userService.domainUrl;
  constructor(
    private config: PrimeNGConfig,
    private userService: UserService,
    private translateService: TranslateService
  ) {
    /**
     * intuitional
     */
  }

  ngOnInit(): void {
    this.dataList = JSON.parse(JSON.stringify(this.data));
    this.setPaginationTitle();

    this.getRecordKey();
    this.getGroupByColumnOptions();
    this.getFilterMenuTranslation();
  }

  ngAfterViewInit(): void {
    this.listeningGroupingMenu();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.actions) 
    if (!changes['data']?.firstChange && changes['data']?.currentValue) {
      this.dataList = JSON.parse(JSON.stringify(changes['data'].currentValue));
      this.setPaginationTitle();
      if (this.viewMood === TableViewMood.GroupView) {
        this.dataList = groupBy(this.data, [...this.propertyGetters]) as any;
      }
    }
  }

  getFilterMenuTranslation(): void {
    this.translateService.get('primeng.filter').subscribe((res: any) => {
      this.config.setTranslation(res);
    });
  }

  onPageChange(event: { first: number; rows: number }): void {
    let pageIndex = event.first / event.rows;
    this.pageSizeChange.emit(event.rows);
    this.pageIndexChange.emit(pageIndex);
  }

  onFilterChange(event: {
    filteredValue: any[];
    filters: { [s: string]: FilterMetadata[] };
  }): void {
    // debugger;
    // let d = event.filters['documentDate'];

    this.filterChanged.emit(event.filters);
  }

  onSort(event: { multisortmeta: SortMeta[] }): void {
    if (this.isColumnSortable(event.multisortmeta[0]?.field))
      this.sortChanged.emit(event.multisortmeta);
  }

  isColumnSortable(felid: string) {
    const col = this.columns.find(col => col.field === felid);
    return !col?.removeSorting;
  }

  onSelectionChange(event: any): void {
    if (
      hasProperty(this.selectedRecords, 'key') &&
      this.viewMood === TableViewMood.GroupView
    )
      this.selectedRecords = JSON.parse(JSON.stringify(this.data));
    this.selectedRecordsChanged.emit(this.selectedRecords);
  }

  onTakeAction(item: MenuItem, recordData: any): void {
    if (recordData.id && item.command) item.command(recordData);
  }

  getRecordKey(): void {
    this.recordKey = this.columns.find(col => col.recordKey)?.field || '';
  }

  getGroupByColumnOptions(): void {
    this.groupColumnsOptions = this.columns.filter(item => item.canGroup);
  }

  trackByIndex(index: number): number {
    return index;
  }

  onGroupByChanged(col: ITableHeader[]): void {
    if (!col.length) {
      this.reset();
      return;
    }
    this.propertyGetters = col.map((key: any) => {
      return (item: any) => item[key.field];
    });

    this.dataList = groupBy(this.data, [...this.propertyGetters]) as any;
    this.viewMood = TableViewMood.GroupView;
  }

  reset(): void {
    this.selectedGroupByCol = [];
    this.viewMood = TableViewMood.RecordsView;
    this.ADVGrid.reset();
    this.enumFilters.forEach(enumFilter => {
      enumFilter.reset();
    });
  }

  getEnumKeyByEnumValue(
    enumObject: { [key: string]: string },
    enumValue: string
  ): string {
    const key = Object.keys(enumObject).find(k => enumObject[k] == enumValue);
    return key !== undefined ? key : '';
  }
  setPaginationTitle(): void {
    this.currentPageReportTemplate = `${this.totalRecordsLength
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}  ${this.moduleTitle}`;
  }

  listeningGroupingMenu(): void {
    const groupingModal = document.getElementById('GroupingMenu');
    const togglerButton = document.getElementById('GroupingMenuToggler');
    document.addEventListener('click', (event: any) => {
      setTimeout(() => {
        if (
          event.target === togglerButton ||
          event.target.closest('#GroupingMenuToggler')
        )
          return;
        if (groupingModal && !groupingModal.contains(event.target)) {
          groupingModal.classList.remove('active');
        }
      }, 0);
    });
  }
}

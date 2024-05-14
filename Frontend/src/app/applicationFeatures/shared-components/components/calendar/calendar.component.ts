import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { DateClickArg } from '@fullcalendar/interaction';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  @Output() ViewChange: EventEmitter<{ date: string; period: string }> = new EventEmitter();
  
  @Input() eventList: any[] |undefined;

  events:any[];
  constructor( private translateService: TranslateService
    
  ) { }
  calendarOptions: CustomCalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
  };

  ngOnChanges(simpleChanges: SimpleChanges) {
    this.events=[];

    this.eventList?.forEach(element => {
      
      let title="";
      this.translateService.get("appointmentType."+element.appointmentType).subscribe(res => {
        title=res;
      });
      let startDate=new Date(element.appointmentDate);
      this.events.push({ title:title, start:new Date(startDate.setDate(startDate.getDate()+1)).toISOString().split('T')[0] })
    });
    this.calendarOptions = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      initialView: 'dayGridMonth',
      weekends: false,
      events: this.events, // [{ title: 'Appointments', start: new Date() }],
      // customButtons: {
      //   dayGridDay: {
      //     text: 'Day',
      //     click: () => this.changeView('Day'),
      //   },
      //   dayGridWeek: {
      //     text: 'Week',
      //     click: () => this.changeView('Week'),
      //   },
      //   dayGridMonth: {
      //     text: 'Month',
      //     click: () => this.changeView('Month'),
      //   },
      // },
      datesSet: (dateInfo) => this.handleDateRangeChange(dateInfo),
      headerToolbar: {
        left: 'prev,next',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      eventColor:'blue',
      eventBackgroundColor :'#1e3f6c',
      editable: true,
      selectable: true,
      dateClick: this.handleDateClick.bind(this)
      //dateClick: this.handleDateClick.bind(this),
    };
  }

  handleDateRangeChange(dateInfo: any): void {
    let period="Month";
     if(dateInfo.view.type=="timeGridDay")
      period="Day";
     if(dateInfo.view.type=="timeGridWeek")
      period="Week";
     let date = new Date().toISOString();
    this.ViewChange.emit({ date, period });
    console.log('View type:', dateInfo.view.type);
    console.log('Current date range:', dateInfo.startStr, 'to', dateInfo.endStr);
    // Perform actions based on the view type or date range
  }
  ngOnInit() {
    
  
  }
  // changeView(period: string) {
  //   debugger
  //   let date = new Date().toISOString();
  //   this.ViewChange.emit({ date, period });
  // }
  handleEventClick(arg: any) {
    console.log('event click! ' + arg.dateStr);
  }

  handleDateClick(arg: any): void {
    let date = arg.dateStr;
    let period="Day";
    this.ViewChange.emit({ date, period });
    console.log('click! ' + arg.dateStr);
  }
}

interface CustomCalendarOptions extends CalendarOptions {
  dateClick?: (arg: DateClickArg) => void;
}

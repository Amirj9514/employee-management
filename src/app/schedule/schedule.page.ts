import { Component,} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { SharedModule } from 'primeng/api';
import { SvgDirective } from '../Shared/directives/svg.directive';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, CommonModule, FormsModule , FullCalendarModule , SvgDirective]
})
export class SchedulePage {
 
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    events: [
      { title: 'Kickoff', start: new Date().toISOString().slice(0,10) },
    ],
    dateClick: this.handleDateClick.bind(this),
    eventClick: this.handleEventClick.bind(this),
  };

  handleDateClick(arg: any) {
    alert('Date clicked: ' + arg.dateStr);
  }

  handleEventClick(arg: any) {
    alert('Event clicked: ' + arg.event.title);
  }

  addEvent() {
    const api = (document.querySelector('full-calendar') as any)?.getApi?.();
    api?.addEvent({ title: 'New Event', start: new Date() });
  }
}

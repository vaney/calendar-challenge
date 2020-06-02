import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Event} from '../../models/event';
import {CalendarComponent} from './calendar.component';
import {DayComponent} from '../day/day.component';
import {EventComponent} from '../event/event.component';
import {EventsStoreService} from '../../services/events/events-store.service';
import {environment} from '../../../environments/environment';

const bootstrapInput: Array<object> = [
  {start: 30, end: 150},
  {start: 540, end: 600},
  {start: 560, end: 620},
  {start: 610, end: 670},
];

@NgModule({
  declarations: [
    CalendarComponent,
    DayComponent,
    EventComponent
  ],
  exports: [
    CalendarComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [EventsStoreService]
})
export class CalendarModule {
  constructor(private eventsStoreService: EventsStoreService) {
    if (!environment.production) {
      // @ts-ignore
      window.layOutDay = this.layOutDay.bind(this);
      // @ts-ignore
      window.layOutDay(bootstrapInput);
    }
  }

  private layOutDay(events: Event[]) {
    console.log('received events', events);

    this.eventsStoreService.resetEvents(events);
  }
}

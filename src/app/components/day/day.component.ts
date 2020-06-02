import {ChangeDetectorRef, Component} from '@angular/core';
import {TimeSlot} from '../../models/time-slot';
import * as moment from 'moment';
import {Event} from '../../models/event';
import {EventsStoreService} from '../../services/events/events-store.service';
import {DayEventsService} from '../../services/events/day-events.service';

@Component({
  selector: 'app-calendar-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss']
})
export class DayComponent {

  events: Event[];
  timeSlots: TimeSlot[];

  constructor(
    private eventsStoreService: EventsStoreService,
    private dayEventsService: DayEventsService,
    private ref: ChangeDetectorRef) {

    ref.detach();
    dayEventsService.initLayout(700, 600);
    this.timeSlots = DayComponent.buildTimeSlots();
    this.eventsStoreService.events$.subscribe(this.layoutEvents.bind(this));
  }

  private static buildTimeSlots(): Array<TimeSlot> {
    const date = moment();
    date.hours(9);
    date.minutes(0);
    const endDate = moment();
    endDate.hours(21);
    endDate.minutes(1);

    const slots: Array<TimeSlot> = [];

    while (date < endDate) {
      slots.push({
        time: date.format('h:mm'),
        postfix: date.minutes() === 0 ? date.format('A') : null
      });

      date.add(30, 'minutes');
    }

    return slots;
  }

  private layoutEvents(values: Event[]) {
    this.events = this.dayEventsService.processEvents(values);

    setTimeout(() => {
      this.ref.detectChanges();
    }, 0);
  }

}

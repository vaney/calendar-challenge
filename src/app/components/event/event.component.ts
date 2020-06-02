import {Component, Input} from '@angular/core';
import {Event} from '../../models/event';

@Component({
  selector: 'app-calendar-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent {

  private _event: Event;

  @Input()
  set event(event: Event) {
    this._event = event;
  }

  get event(): Event {
    return this._event;
  }

}

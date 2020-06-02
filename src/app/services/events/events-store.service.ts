import { Injectable } from '@angular/core';
import {Event} from '../../models/event';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsStoreService {

  private readonly _events = new BehaviorSubject<Event[]>([]);

  readonly events$ = this._events.asObservable();

  get events(): Event[] {
    return this._events.getValue();
  }

  set events(value: Event[]) {
    this._events.next(value);
  }

  resetEvents(values: Event[]) {
    this.events = values.map((value: Event) => new Event(value));
  }

  addEvent(event: Event) {
    this.events.push(new Event(event));
  }

  removeEvent(id: string) {
    this.events = this.events.filter(todo => todo.id !== id);
  }
}

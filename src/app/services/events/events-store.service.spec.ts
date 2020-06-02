import {async, TestBed} from '@angular/core/testing';

import { EventsStoreService } from './events-store.service';
import {Event} from '../../models/event';

describe('EventsStoreService', () => {
  let service: EventsStoreService;
  const event = new Event();

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventsStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add event', () => {
    service.addEvent(event);
    expect(service.events).toEqual([event]);
  });

  it('should remove event', () => {
    const event2 = new Event();
    service.events = [event, event2];
    service.removeEvent(event.id);
    expect(service.events).toEqual([event2]);
  });

  it('#events$ should bring value from observable', async(() => {
    service.resetEvents([event]);
    service.events$.subscribe((values) => {
      expect(values).toEqual([event]);
    });
  }));
});

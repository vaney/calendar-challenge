import { TestBed } from '@angular/core/testing';

import { DayEventsService } from './day-events.service';
import {Event} from '../../models/event';

describe('DayEventsService', () => {
  let service: DayEventsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DayEventsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set layout parameters', () => {
    service.initLayout(720, 600);

    expect(service.height).toEqual(720);
    expect(service.width).toEqual(600);
  });

  it('should process events', () => {
    const event1 = new Event({ start: 30, end: 60});
    const event2 = new Event({ start: 30, end: 60});
    service.initLayout(720, 600);

    const events = service.processEvents([event1, event2]);

    expect(events[0].width).toEqual(50);
    expect(events[1].width).toEqual(50);
  });

  it('should not fail when having invalid input', () => {
    const event1 = new Event({ start: -10, end: 60});
    const event2 = new Event({ start: 630, end: 760});
    service.initLayout(720, 600);

    const events = service.processEvents([event1, event2]);

    expect(events[0]).toBeDefined();
    expect(events[1]).toBeDefined();
  });
});

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
    service.initLayout(700, 600);

    expect(service.height).toEqual(700);
    expect(service.width).toEqual(600);
  });

  it('should process events', () => {
    const event1 = new Event({ start: 30, end: 60});
    const event2 = new Event({ start: 30, end: 60});
    service.initLayout(700, 600);

    const events = service.processEvents([event1, event2]);

    expect(events[0].width).toEqual(50);
    expect(events[1].width).toEqual(50);
  });
});

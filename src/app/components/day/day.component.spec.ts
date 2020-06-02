import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

import { DayComponent } from './day.component';
import {EventsStoreService} from '../../services/events/events-store.service';
import {Event} from '../../models/event';

describe('DayComponent', () => {
  let component: DayComponent;
  let fixture: ComponentFixture<DayComponent>;
  let service: EventsStoreService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      declarations: [ DayComponent ]
    })
    .compileComponents();
    service = new EventsStoreService();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render timeline slots', async(() => {
    const timeSlotsLength = component.timeSlots.length;
    const compiled = fixture.nativeElement;
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(compiled.querySelectorAll('.time-line .time-slots li').length).toEqual(timeSlotsLength);
    });
  }));

  it('should render events', async(() => {
    component.events = [new Event()];

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const compiled = fixture.nativeElement;
      expect(compiled.querySelectorAll('.events .events-layout app-calendar-event').length).toEqual(1);
    });
  }));

  it('#events$ should bring value from observable', async(() => {
    const event = new Event();
    service.resetEvents([event]);
    service.events$.subscribe((values) => {
      expect(values).toEqual([event]);
    });
  }));
});

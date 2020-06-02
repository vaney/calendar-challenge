import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {Event} from '../../models/event';
import { EventComponent } from './event.component';

describe('EventComponent', () => {
  let component: EventComponent;
  let fixture: ComponentFixture<EventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventComponent);
    component = fixture.componentInstance;
    component.event = new Event();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title', () => {
    component.event = new Event({ height: 1, title: 'testing title', location: 'testing location'});
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('div h1').textContent).toContain('testing title');
  });

  it('should render location', () => {
    component.event = new Event({ height: 1, title: 'testing title', location: 'testing location'});
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('div h2').textContent).toContain('testing location');
  });
});

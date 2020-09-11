import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventoScraperComponent } from './evento-scraper.component';

describe('EventoScraperComponent', () => {
  let component: EventoScraperComponent;
  let fixture: ComponentFixture<EventoScraperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventoScraperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventoScraperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

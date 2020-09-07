import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LutadorScraperComponent } from './lutador-scraper.component';

describe('LutadorScraperComponent', () => {
  let component: LutadorScraperComponent;
  let fixture: ComponentFixture<LutadorScraperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LutadorScraperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LutadorScraperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

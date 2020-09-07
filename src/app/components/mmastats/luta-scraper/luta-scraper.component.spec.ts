import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LutaScraperComponent } from './luta-scraper.component';

describe('LutaScraperComponent', () => {
  let component: LutaScraperComponent;
  let fixture: ComponentFixture<LutaScraperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LutaScraperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LutaScraperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

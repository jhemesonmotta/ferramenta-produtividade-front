import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GerarCsvComponent } from './gerar-csv.component';

describe('GerarCsvComponent', () => {
  let component: GerarCsvComponent;
  let fixture: ComponentFixture<GerarCsvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GerarCsvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GerarCsvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RodarScrappersComponent } from './rodar-scrappers.component';

describe('RodarScrappersComponent', () => {
  let component: RodarScrappersComponent;
  let fixture: ComponentFixture<RodarScrappersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RodarScrappersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RodarScrappersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

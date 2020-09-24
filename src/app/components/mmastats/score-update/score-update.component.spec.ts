import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreUpdateComponent } from './score-update.component';

describe('ScoreUpdateComponent', () => {
  let component: ScoreUpdateComponent;
  let fixture: ComponentFixture<ScoreUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScoreUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

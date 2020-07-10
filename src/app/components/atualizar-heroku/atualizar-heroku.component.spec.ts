import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtualizarHerokuComponent } from './atualizar-heroku.component';

describe('AtualizarHerokuComponent', () => {
  let component: AtualizarHerokuComponent;
  let fixture: ComponentFixture<AtualizarHerokuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtualizarHerokuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtualizarHerokuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinerarProjetoComponent } from './minerar-projeto.component';

describe('MinerarProjetoComponent', () => {
  let component: MinerarProjetoComponent;
  let fixture: ComponentFixture<MinerarProjetoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinerarProjetoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinerarProjetoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

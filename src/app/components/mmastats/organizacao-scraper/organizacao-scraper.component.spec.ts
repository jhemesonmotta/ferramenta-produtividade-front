import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizacaoScraperComponent } from './organizacao-scraper.component';

describe('OrganizacaoScraperComponent', () => {
  let component: OrganizacaoScraperComponent;
  let fixture: ComponentFixture<OrganizacaoScraperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizacaoScraperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizacaoScraperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

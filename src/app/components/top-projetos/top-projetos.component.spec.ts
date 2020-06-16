import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopProjetosComponent } from './top-projetos.component';
import { GithubApiService } from 'src/app/services/github/github-api.service';
import { HttpClientModule } from '@angular/common/http';
import { SharedService } from 'src/app/services/shared.service';

describe('TopProjetosComponent', () => {
  let component: TopProjetosComponent;
  let fixture: ComponentFixture<TopProjetosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopProjetosComponent ],
      imports: [ HttpClientModule ],
      providers: [ GithubApiService, SharedService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopProjetosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

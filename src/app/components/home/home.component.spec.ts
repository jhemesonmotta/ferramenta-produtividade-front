import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { PageSpeedApiService } from 'src/app/services/pagespeed/pagespeed-api.service';
import { GithubApiService } from 'src/app/services/github/github-api.service';
import { HttpClientModule } from '@angular/common/http';
import { GenderizeApiService } from 'src/app/services/genderize/genderize-api.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [
        HttpClientModule
      ],
      providers: [GithubApiService, PageSpeedApiService, GenderizeApiService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

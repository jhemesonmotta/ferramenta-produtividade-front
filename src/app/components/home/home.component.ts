import { Component, OnInit } from '@angular/core';
import { GithubApiService } from 'src/app/services/github/github-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public githubApiService: GithubApiService) { }

  ngOnInit() {
    console.log('teste');

    this.githubApiService.consultarCommits('abc').subscribe((data) => {
        console.log('data');
        console.log(data);
      },
      (error) => {
        console.log('error');
        console.log(error);
      });
  }

}

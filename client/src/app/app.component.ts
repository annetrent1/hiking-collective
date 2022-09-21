import { Component, OnInit } from '@angular/core';
import { StatesService } from './services/states.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'hiking-collective';
  states = [];
  constructor(private statesService: StatesService) {}

  ngOnInit() {
    this.statesService.getStates().subscribe({
      next: (response) => {
        this.states = response;
        console.log("STATES: ", response);
      },
      error: () => {
        console.log('oops');
      },
      complete: () => {
        console.log("done");
      }
    })
  }
}

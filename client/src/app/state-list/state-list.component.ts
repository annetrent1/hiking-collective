import { Component, OnInit } from '@angular/core';
import { StatesService } from '../services/states.service';

@Component({
  selector: 'app-state-list',
  templateUrl: './state-list.component.html',
  styleUrls: ['./state-list.component.scss']
})
export class StateListComponent implements OnInit {
  states = [];
  
  constructor(private statesService: StatesService) { }

  ngOnInit(): void {
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

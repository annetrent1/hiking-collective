import { Component, OnInit } from '@angular/core';
import { State } from '../models/states';
import { StatesService } from '../services/states.service';

@Component({
  selector: 'app-state-list',
  templateUrl: './state-list.component.html',
  styleUrls: ['./state-list.component.scss']
})
export class StateListComponent implements OnInit {
  states!: State[];
  
  constructor(private statesService: StatesService) { }

  ngOnInit(): void {
    this.statesService.getStates().subscribe({
      next: (response) => {
        this.states = response;
        console.log("STATES: ", response);
        console.log("STATES: ", this.states);
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

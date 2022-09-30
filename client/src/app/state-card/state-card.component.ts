import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-state-card',
  templateUrl: './state-card.component.html',
  styleUrls: ['./state-card.component.scss']
})
export class StateCardComponent implements OnInit {
  @Input() state: any;
  @Input() left!: boolean;
  
  constructor() { }

  ngOnInit(): void {
  }

}

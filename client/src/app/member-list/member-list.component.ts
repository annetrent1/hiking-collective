import { Component, OnInit } from '@angular/core';
import { Group, Member } from '../models/groups';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit {
  group!: Group;
  members: Member[] = [];
  display: boolean = false;
  
  constructor() { 
    if(window.history.state.group) {
      this.group = window.history.state.group;
      this.members = window.history.state.group.Members;
    }
  }

  ngOnInit(): void {
    console.log("State", window.history.state);
  }

  showDialog() {
    this.display = true;
  }
}

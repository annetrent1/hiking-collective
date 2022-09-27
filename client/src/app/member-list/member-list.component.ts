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
  selectedMember!: Member
  
  constructor() { 
    if(window.history.state.group) {
      this.group = window.history.state.group;
      this.members = window.history.state.group.Members;
    }
  }

  ngOnInit(): void {
    console.log("State", window.history.state);
  }

  showDialog(memberData: any) {
    this.selectedMember = memberData
    this.display = true;
  }

  close(evt: boolean) {
    this.display = false;
    console.log('close', this.display)
  }
}

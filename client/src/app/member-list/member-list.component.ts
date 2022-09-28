import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Group, Member } from '../models/groups';
import { GroupsService } from '../services/groups.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss'],
})
export class MemberListComponent implements OnInit {
  group!: Group;
  members: any;
  display: boolean = false;
  selectedMember!: Member;

  constructor(private groupService: GroupsService, private location: Location) {
    if (window.history.state.group) {
      console.log('window history',  window.history.state.group)
      this.group = window.history.state.group;
      console.log('window history Member',  window.history.state.group.Member)
      this.members = window.history.state.group.Members;
    }
  }

  ngOnInit(): void {
    // this.groupService.currentGroup.subscribe((data) => {
    //   console.log('Subject Sub', data)
    //   this.group = data;
    //   console.log('Subject group', data.Members)
    //   this.members = data.Members;
    // });
  }

  showDialog(memberData: any) {
    this.selectedMember = memberData;
    this.display = true;
  }

  close(evt: boolean) {
    this.display = false;
    console.log('close', this.display);
  }

  back() {
    this.location.back();
  }
}

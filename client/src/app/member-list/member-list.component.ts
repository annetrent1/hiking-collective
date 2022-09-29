import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Group, Member } from '../models/groups';
import { GroupsService } from '../services/groups.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss'],
})
export class MemberListComponent implements OnInit {
  group!: Group;
  GroupId!: number;
  members: any;
  display: boolean = false;
  selectedMember!: Member;
  currentGroup!: Observable<Group>;

  constructor(private groupService: GroupsService, private location: Location, private activatedRoute: ActivatedRoute) {
    if (this.activatedRoute.snapshot.params.GroupId) {
      this.GroupId = this.activatedRoute.snapshot.params.GroupId;
      console.log('GROUP ID', this.GroupId);
    }
    this.groupService.getGroupById(this.GroupId).subscribe({
      next: (response) => {
        this.group = response;
        this.members = response.Members;
      },
      error: () => {
        console.log('groups oops');
      },
      complete: () => {
        console.log('groups done');
      },
    });
  }

  ngOnInit(): void {
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

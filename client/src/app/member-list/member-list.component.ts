import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Group, Member } from '../models/groups';
import { GroupsService } from '../services/groups.service';
import { MessageService } from 'primeng-lts/api';

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

  constructor(
    private groupService: GroupsService,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService
  ) {
    if (this.activatedRoute.snapshot.params.GroupId) {
      this.GroupId = this.activatedRoute.snapshot.params.GroupId;
    }
    this.getGroupMember();
  }

  getGroupMember() {
    this.groupService.getGroupById(this.GroupId).subscribe({
      next: (response: Group) => {
        this.group = response;
        this.members = response.Members;
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `Something went wrong, the group was not able to load`,
        });
      },
    });
  }

  ngOnInit(): void {}

  showDialog(memberData: any) {
    this.selectedMember = memberData;
    this.display = true;
  }

  close(evt: boolean) {
    this.display = false;
    console.log('close', this.display);
    this.getGroupMember();
  }

  back() {
    this.location.back();
  }

  isMaxCapacity() {
    return this.members.length < this.group.MaxGroupSize;
  }
}

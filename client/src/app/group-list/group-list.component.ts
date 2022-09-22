import { Component, OnInit } from '@angular/core';
import { GroupsService } from '../services/groups.service';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss'],
})
export class GroupListComponent implements OnInit {
  groups = [];
  display: boolean = false;

  constructor(private groupsService: GroupsService) {}

  ngOnInit(): void {
    this.groupsService.getGroups().subscribe({
      next: (response) => {
        this.groups = response;
        console.log('GROUPS: ', response);
      },
      error: () => {
        console.log('groups oops');
      },
      complete: () => {
        console.log('groups done');
      },
    });
  }

  showDialog() {
    this.display = true;
  }
}

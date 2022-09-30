import { Location } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Group } from '../models/groups';
import { State } from '../models/states';
import { GroupsService } from '../services/groups.service';
import { StatesService } from '../services/states.service';
import { MessageService } from 'primeng-lts/api';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss'],
})
export class GroupListComponent implements OnInit {
  groups: Group[] = [];
  display: boolean = false;
  states: string[] = [];
  selectedState!: string;
  filteredGroups: Group[] = [];
  selectedGroup: any;

  constructor(
    private groupsService: GroupsService,
    private stateService: StatesService,
    private activatedRoute: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private location: Location,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getGroups();
    this.stateService.getStates().subscribe({
      next: (response: State[]) => {
        response.forEach((state) => {
          this.states.push(state.StateName);
        });
        console.log('check', this.states);
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `Something went wrong`,
        });
      },
      complete: () => {
        console.log('complete');
        if (this.activatedRoute.snapshot.params.StateName) {
          this.selectedState = this.activatedRoute.snapshot.params.StateName;
        }
        this.filterState(this.selectedState);
      },
    });
  }

  getGroups() {
    this.groupsService.getGroups().subscribe({
      next: (response: Group[]) => {
        this.groups = response;
        console.log('HELP', response)
        this.cd.detectChanges();
        // this.filteredGroups = this.groups
        if (Array.isArray(this.groups)) {
          this.filterState(this.selectedState);
        }
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `Something went wrong, the groups were not able to load`,
        });
      },
      complete: () => {
        this.filterState(this.selectedState);
        console.log("COMPLETE")
      }
    });
  }

  showDialog(groupData: any) {
    this.display = true;
    this.selectedGroup = groupData;
    console.log('Show Dialog', this.display);
  }

  filterState(state: string) {
    this.updateRoute(state);
    if (state && Array.isArray(this.groups)) {
      this.filteredGroups = this.groups.filter(
        (group) => group.StateName == state
      );
    } else {
      this.filteredGroups = this.groups;
    }
  }

  updateRoute(state: string) {
    if (state) {
      this.location.replaceState(`groups/${state}`);
    } else {
      this.location.replaceState(`groups`);
    }
  }

  close(evt: boolean) {
    this.display = false;
    console.log('close', this.display);

    this.getGroups();
    // this.filterState(this.selectedState);
  }

  selectGroup(group: Group) {
    this.groupsService.setSelectedGroup(group);
  }

  isMaxCapacity(group: any) {
    return group.Members.length < group.MaxGroupSize;
  }
}

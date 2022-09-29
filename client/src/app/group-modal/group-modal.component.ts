import { HttpHeaders } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Event, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng-lts/api';
import { GroupsService } from '../services/groups.service';
import { StatesService } from '../services/states.service';

@Component({
  selector: 'app-group-modal',
  templateUrl: './group-modal.component.html',
  styleUrls: ['./group-modal.component.scss'],
})
export class GroupModalComponent implements OnInit {
  @Input() states!: string[];
  @Input() selectedState!: string;
  @Input() selectedGroup!: any;
  @Output() close = new EventEmitter<boolean>();
  groupForm!: FormGroup;
  visible = true;
  isNewGroup!: boolean;

  constructor(
    private stateService: StatesService,
    private groupService: GroupsService,
    private confService: ConfirmationService,
    private router: Router,
    private messageService: MessageService
  ) {
  }

  ngOnInit(): void {
    console.log('selectedState', this.selectedState);
    console.log('selectedGroup ', this.selectedGroup);
    if (this.selectedGroup) {
      this.groupForm = new FormGroup(
        {
          GroupName: new FormControl(this.selectedGroup.GroupName, {
            validators: Validators.required,
          }),
          StateName: new FormControl(this.selectedGroup.StateName, {
            validators: Validators.required,
          }),
          MaxGroupSize: new FormControl(this.selectedGroup.MaxGroupSize, {
            validators: Validators.required,
          }),
          SponsorEmail: new FormControl(this.selectedGroup.SponsorEmail, [
            Validators.required,
            Validators.email,
          ]),
          SponsorName: new FormControl(this.selectedGroup.SponsorName, {
            validators: Validators.required,
          }),
          SponsorPhone: new FormControl(this.selectedGroup.SponsorPhone, [
            Validators.required,
          ]),
          GroupId: new FormControl(this.selectedGroup.GroupId),
        },
        { updateOn: 'blur' }
      );
      this.isNewGroup = false;
    } else {
      this.groupForm = new FormGroup(
        {
          GroupName: new FormControl(null, { validators: Validators.required }),
          StateName: new FormControl(
            this.selectedState ? this.selectedState : null,
            { validators: Validators.required }
          ),
          MaxGroupSize: new FormControl(null, {
            validators: Validators.required,
          }),
          SponsorEmail: new FormControl(null, [
            Validators.required,
            Validators.email,
          ]),
          SponsorName: new FormControl(null, {
            validators: Validators.required,
          }),
          SponsorPhone: new FormControl(null, [Validators.required]),
        },
        { updateOn: 'blur' }
      );
      this.isNewGroup = true;
    }
  }

  onSubmit(formValues: any): void {
    console.log('SUBMIT', formValues);
    this.groupService.addGroup(formValues).subscribe(
      (response: any) => {
        this.groupService.groups$.next(formValues);
        console.log('add response', response);
        this.selectedState = formValues.StateName;
        this.router.navigate([`groups/${this.selectedState}`]);
        this.closeModal();
        this.messageService.add({
          severity: 'success',
          summary: 'Confirmed',
          detail: `${formValues.GroupName} was successfully added!`,
        });
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `Something went wrong, ${formValues.GroupName} was not able to be added at this time`,
        });
      }
    );
  }

  // onSubmit(formValues: any): void {
  //   console.log('SUBMIT', formValues);
  //   this.groupService.addGroup(formValues).subscribe((group: any) => {
  //     console.log('add response', group);
  //     this.groupService.groups$.next(formValues);
  //     // routes to the groups so the user can see their group was added
  //     this.router.navigate([`groups/${this.selectedState}`]);
  //     this.closeModal();
  //   });
  // }

  onUpdate(formValues: any): void {
    console.log('Edit', formValues);
    this.groupService.editGroup(formValues).subscribe((response: any) => {
      console.log('edit response', response);
      this.groupService.groups$.next(formValues);
      this.messageService.add({
        severity: 'success',
        summary: 'Confirmed',
        detail: `Changes to ${formValues.GroupName} were saved.`,
      });
    },
    () => {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: `Something went wrong, changes for ${formValues.GroupName} were not able to be saved at this time`,
      });
    });
    this.router.navigate([`groups/${this.selectedState}`]);
    this.closeModal();
  }

  closeModal() {
    this.close.emit(true);
  }

  deleteGroup(event: any) {
    console.log('EVENT: ', event);
    this.confService.confirm({
      target: event.target,
      message: 'Are you sure that you want to proceed?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        console.log('delete confirm', this.selectedGroup.GroupId);
        this.groupService
          .deleteGroup(this.selectedGroup.GroupId)
          .subscribe((response: any) => {
            console.log('delete response', response);
            // this.groupService.groups$.next(this.groupForm);
            this.router.navigate([`groups/${this.selectedState}`]);
            this.messageService.add({
              severity: 'success',
              summary: 'Confirmed',
              detail: `${this.selectedGroup.GroupName} was successfully removed!`,
            });
          },
          () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: `Something went wrong, ${this.selectedGroup.GroupName} were not able to be removed at this time`,
            });
          });
        this.closeModal();
      },
      reject: () => {
        //reject action
      },
    });
  }
}

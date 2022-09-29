import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ConfirmationService, MessageService } from 'primeng-lts/api';
import { GroupsService } from '../services/groups.service';

@Component({
  selector: 'app-member-modal',
  templateUrl: './member-modal.component.html',
  styleUrls: ['./member-modal.component.scss'],
})
export class MemberModalComponent implements OnInit {
  @Input() groupId: any;
  @Output() close = new EventEmitter<boolean>();
  @Input() selectedMember!: any;
  display = true;
  isNewMember!: boolean;

  memberForm!: FormGroup;
  constructor(
    private groupService: GroupsService,
    private confService: ConfirmationService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    if (this.selectedMember) {
      this.memberForm = new FormGroup(
        {
          MemberName: new FormControl(this.selectedMember.MemberName, [
            Validators.required,
            Validators.minLength(4),
          ]),
          MemberPhone: new FormControl(this.selectedMember.MemberPhone, [
            Validators.required,
          ]),
          MemberEmail: new FormControl(this.selectedMember.MemberEmail, [
            Validators.required,
            Validators.email,
          ]),
          MemberId: new FormControl(this.selectedMember.MemberId),
        },
        { updateOn: 'blur' }
      );
      this.isNewMember = false;
    } else {
      this.memberForm = new FormGroup(
        {
          MemberName: new FormControl(null, {
            validators: Validators.required,
          }),
          MemberPhone: new FormControl(null, {
            validators: Validators.required,
          }),
          MemberEmail: new FormControl(null, [
            Validators.required,
            Validators.email,
          ]),
        },
        { updateOn: 'blur' }
      );
      this.isNewMember = true;
    }
  }

  onSubmit(formValues: any): void {
    if (this.isValid()) {
      this.groupService.addMember(formValues, this.groupId).subscribe(
        () => {
          this.closeModal();
          this.messageService.add({
            severity: 'success',
            summary: 'Confirmed',
            detail: `${formValues.MemberName} was successfully added!`,
          });
          this.router.navigate([`members/${this.groupId}`]);
        },
        () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: `Something went wrong, ${formValues.MemberName} was not able to be added at this time`,
          });
        }
      );
    }
  }

  onUpdate(formValues: any): void {
    if (this.isValid()) {
      this.groupService.editMember(formValues, this.groupId).subscribe(
        (response: any) => {
          this.closeModal();
          this.messageService.add({
            severity: 'success',
            summary: 'Confirmed',
            detail: `Changes to ${formValues.MemberName} were saved.`,
          });
        },
        () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: `Something went wrong, changes for ${formValues.MemberName} were not able to be saved at this time`,
          });
        }
      );
    }
  }

  closeModal() {
    this.close.emit(true);
  }

  isValid(): boolean {
    console.log('FORM', this.memberForm.valid);
    if (this.memberForm.valid) {
      return true;
    } else {
      this.memberForm.markAllAsTouched();
      return false;
    }
  }

  deleteMember(event: any) {
    this.confService.confirm({
      target: event.target,
      message: 'Are you sure that you want to proceed?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        console.log('delete confirm', this.selectedMember.MemberId);
        this.groupService
          .deleteMember(this.selectedMember.MemberId, this.groupId)
          .subscribe(
            (response: any) => {
              this.messageService.add({
                severity: 'success',
                summary: 'Confirmed',
                detail: `${this.selectedMember.MemberName} was successfully removed from group!`,
              });
            },
            () => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: `Something went wrong, ${this.selectedMember.MemberName} were not able to be removed at this time`,
              });
            }
          );
        this.closeModal();
      },
      reject: () => {},
    });
  }
}

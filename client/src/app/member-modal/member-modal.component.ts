import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ConfirmationService } from 'primeng-lts/api';
import { GroupsService } from '../services/groups.service';

@Component({
  selector: 'app-member-modal',
  templateUrl: './member-modal.component.html',
  styleUrls: ['./member-modal.component.scss']
})
export class MemberModalComponent implements OnInit {
  @Input() groupId: any;
  @Output() close = new EventEmitter<boolean>();
  @Input() selectedMember!: any;
  display = true;
  isNewMember!: boolean;

  memberForm!: FormGroup;
  constructor(private groupService: GroupsService, private confService: ConfirmationService, private router: Router
    ) { 
    
  }

  ngOnInit(): void {
    if(this.selectedMember) {
      this.memberForm = new FormGroup({
        MemberName: new FormControl(this.selectedMember.MemberName, {validators: Validators.required}),
        MemberPhone: new FormControl(this.selectedMember.MemberPhone, {validators: Validators.required}),
        MemberEmail: new FormControl(this.selectedMember.MemberEmail, [Validators.required, Validators.email]),
        MemberId: new FormControl(this.selectedMember.MemberId),
      }, {updateOn: 'blur'})
      this.isNewMember = false
    } else {
      this.memberForm = new FormGroup({
        MemberName: new FormControl(null, {validators: Validators.required}),
        MemberPhone: new FormControl(null, {validators: Validators.required}),
        MemberEmail: new FormControl(null, [Validators.required, Validators.email])
      }, {updateOn: 'blur'})
      this.isNewMember = true;
    }
  }

  onSubmit(formValues: any): void {
    console.log("SUBMIT", formValues);
    this.groupService.addMember(formValues, this.groupId).subscribe(
      (response: any) => {
        this.closeModal();
        // this.router.navigate([`groups/${this.selectedState}`]);
      }
    )
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
    console.log('Edit Member', formValues, this.groupId);
    this.groupService.editMember(formValues, this.groupId).subscribe((response: any) => {
      console.log('edit response', response);
    });
  }


  closeModal() {
    this.close.emit(true);
  }

  deleteMember(event: any) {
    console.log('EVENT: ', event);
    this.confService.confirm({
      target: event.target,
      message: 'Are you sure that you want to proceed?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        console.log('delete confirm', this.selectedMember.MemberId);
        this.groupService.deleteMember(this.selectedMember.MemberId, this.groupId).subscribe((response: any) => {
          console.log('delete response', response);
        });
        this.closeModal();
      },
      reject: () => {
        //reject action
      },
    });
  }

}

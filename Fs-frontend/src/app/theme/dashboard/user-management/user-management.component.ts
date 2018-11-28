import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../../services/user.servivce';
import { AddUserComponent } from './add-user/add-user.component';
import { HttpResponse } from '@angular/common/http';
import { EditUserComponent } from './edit-user/edit-user.component';

@Component({
  selector: '<app-user-management></app-user-management>',
  templateUrl: './user-management.component.html',
  styleUrls: [
    './user-management.component.scss',
    '../../../../assets/icon/icofont/css/icofont.scss'
  ]
})
export class UserManagementComponent implements OnInit {
  deleting: Boolean;
  showMessage: any;
  constructor(
    private userService: UserService,
    private modalService: NgbModal
  ) {
    this.getUsers();
  }
  search_input: string = null;
  editing = {};
  rows = [];
  temp_rows = [];
  ngOnInit() {

  }

  getUsers() {
    this.userService.getUsers()
      .subscribe(users => {
        console.log("usersssssssss", users);
        this.rows = users['data'];
        this.temp_rows = users['data'];
      })
  }

  updateValue(event, cell, row) {
    this.editing[row + '-' + cell] = false;
    this.temp_rows[row][cell] = event.target.value;
    this.rows = this.temp_rows;
    this.userService.updateUser(this.rows[row]._id, this.rows[row])
      .subscribe((response: HttpResponse<any>) => {
        if (response.status === 200) {
          this.getUsers();
          this.openSuccessSwal();
        }
      }, (error) => {
        this.showMessage = error.error['message'];
        this.getUsers();
        this.openUnscuccessSwal()
      })
  }

  onSearchInputChange(val) {
    if (val) {
      val = val.toLowerCase();
      let data = this.temp_rows;
      data = data.filter(user => {
        // if (
        //   user.firstName ? user.firstName.toLowerCase().indexOf(val) >= 0 : false ||
        //   user.lastName ? user.lastName.toLowerCase().indexOf(val) >= 0 : false ||
        //   user.email ? user.email.toLowerCase().indexOf(val) >= 0 : false ||
        //   user.mobile ? user.mobile.indexOf(val) >= 0 : false ||
        //   user.status ? user.status.toLowerCase().indexOf(val) >= 0 : false
        // )
        if (
          user.firstName && user.firstName.toLowerCase().indexOf(val) >= 0 ? true : false ||
          user.lastName && user.lastName.toLowerCase().indexOf(val) >= 0 ? true : false ||
          user.email && user.email.toLowerCase().indexOf(val) >= 0 ? true : false ||
          user.status && user.status.toLowerCase().indexOf(val) >= 0 ? true : false
        )
          return true;
      });
      this.rows = data;
    } else {
      this.rows = this.temp_rows;
    }
  }

  openSuccessSwal() {
    swal({
      title: 'Successful!',
      text: 'User updated successfully!',
      type: 'success'
    }).catch(swal.noop);
  }

  openUnscuccessSwal() {
    swal({
      title: 'Cancelled!',
      text: this.showMessage,
      type: 'error'
    }).catch(swal.noop);
  }

  openSuccessCancelSwal(name) {
    this.deleting = true;
    swal({
      title: 'Are you sure?',
      text: 'You not be able to revert this!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger mr-sm'
    }).then((result) => {
      if (result.value) {
        this.userService.modifyStatus(name._id).subscribe((response: HttpResponse<any>) => {
          if (response.status === 200) {
            this.getUsers();
            swal(
              'Deleted!',
              'Your have delete user successfully.',
              'success'
            );
          }
        });

      } else if (result.dismiss) {
        swal(
          'Cancelled',
          'You have cancelled deletion request.)',
          'error'
        );
      }
    });

  }

  openFormModal() {
    const modalRef = this.modalService.open(AddUserComponent);
    modalRef.result.then((result) => {
      this.getUsers();
    }).catch((error) => {
      this.getUsers();
    });
  }

  openEditFormModal(user) {
    const modalRef = this.modalService.open(EditUserComponent);
    modalRef.componentInstance.currentUser = user;
    modalRef.result.then((result) => {
      this.getUsers();
    })
      .catch((error) => {
        this.getUsers();
      });
  }

  activateUser(name) {
    console.log("name", name)
    swal({
      title: 'Are you sure?',
      text: 'You not be able to revert this!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, activate it!',
      cancelButtonText: 'Not now!',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger mr-sm'
    }).then((result) => {
      if (result.value) {
        this.userService.modifyStatus(name._id).subscribe((response: HttpResponse<any>) => {
          console.log(response)
          if (response.status === 200) {
            this.getUsers();
            swal(
              'Success!',
              'Your have activated user successfully.',
              'success'
            );
          }
        });

      } else if (result.dismiss) {
        swal(
          'Cancelled',
          'You have cancelled activation request.)',
          'error'
        );
      }
    });
  }
}

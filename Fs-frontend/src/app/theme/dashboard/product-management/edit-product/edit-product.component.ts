import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';
import { FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../../../services/user.servivce';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  updateUserForm: FormGroup;
  showMessage: any;
  statuss: Array<String> = ['Active', 'Inactive'];
  roles: Array<String> = ['Buyer', 'Seller', 'Admin', 'SubAdmin'];
  @Input() currentUser;
  constructor(
    public activeModal: NgbActiveModal,
    private userService: UserService
    ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm(){
    console.log("current user", this.currentUser);
    let firstName = this.currentUser.firstName ? this.currentUser.firstName : '';
    let lastName = this.currentUser.lastName ? this.currentUser.lastName : '';
    let email = this.currentUser.email ? this.currentUser.email : '';
    let password = this.currentUser.password ? this.currentUser.password : '';
    let status = this.currentUser.status ? this.currentUser.status: '';
    let mobile = this.currentUser.mobile ? this.currentUser.mobile : null;
    let role = this.currentUser.role ? this.currentUser.role : null;
    this.updateUserForm = new FormGroup({
      'firstName': new FormControl(firstName),
      'lastName': new FormControl(lastName),
      'email': new FormControl(email),
      'password': new FormControl(password),
      'status': new FormControl(status),
      'mobile': new FormControl(mobile),
      'role': new FormControl(role)
    })
  }

  updateUser(){
    this.userService.updateUser(this.currentUser._id, this.updateUserForm.value)
    .subscribe((response: HttpResponse<any>) => {
      if(response.status === 200){
        this.closeModal();
        this.openSuccessSwal();
      }
    }, (error) => {
      this.closeModal();
      console.log("eror", error)
      this.showMessage = error.error['message']
      this.openUnscuccessSwal();
    })
    
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

  closeModal() {
    this.activeModal.close('Modal Closed');
  }

  cancelNewUserAddition(){
    this.updateUserForm.reset();
    this.closeModal();
  }

  clearModal(){
    this.updateUserForm.reset();
  }

}

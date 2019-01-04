import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';
import { FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../../../services/user.servivce';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  newUserForm: FormGroup;
  showMessage: any;
  statuss: Array<String> = ['Active', 'Inactive'];
  roles: Array<String> = ['Buyer', 'Seller', 'Admin', 'SubAdmin', 'Agent', 'Reseller'];
  permission: Array<any> = [
    { 'id': 1, 'itemName': 'isAdmin' },
    { 'id': 2, 'itemName': 'isSubAdmin' },
    { 'id': 3, 'itemName': 'isBuyer' },
    { 'id': 4, 'itemName': 'isSupplier' },
    { 'id': 5, 'itemName': 'isReseller' },
    { 'id': 6, 'itemName': 'isAgent' },
    { 'id': 7, 'itemName': 'isAccountAdmin' }]
  selectedPermission: any = [];
  showPermissionFlag: boolean = false;
  settings2 = {
    singleSelection: false,
    text: "Select Category",
    enableSearchFilter: true
  };
  constructor(
    public activeModal: NgbActiveModal,
    private userService: UserService
  ) { }

  ngOnInit() {

    this.createForm();
  }

  createForm() {
    this.newUserForm = new FormGroup({
      'firstName': new FormControl(null),
      'lastName': new FormControl(null),
      'email': new FormControl(null),
      'password': new FormControl(null),
      'mobile': new FormControl(null),
      'status': new FormControl(null),
      'role': new FormControl(null),
      'permissions': new FormControl(null)
    })
  }

  addNewUser() {
    let permission = { isAdmin: false, isSubAdmin: false, isBuyer: false, isSupplier: false, isReseller: false, isAgent: false, isAccountAdmin: false }
    if (this.selectedPermission.length > 0 && this.newUserForm.value.role == 'SubAdmin') {
      this.selectedPermission.forEach(element => {
        if (element.itemName == 'isAdmin') permission.isAdmin = true;
        if (element.itemName == 'isSubAdmin') permission.isSubAdmin = true;
        if (element.itemName == 'isBuyer') permission.isBuyer = true;
        if (element.itemName == 'isSupplier') permission.isSupplier = true;
        if (element.itemName == 'isReseller') permission.isReseller = true;
        if (element.itemName == 'isAgent') permission.isAgent = true;
        if (element.itemName == 'isAccountAdmin') permission.isAccountAdmin = true;
      });
    }
    this.newUserForm.value.permissions = permission;
    console.log("this form", JSON.stringify(this.newUserForm.value));
    this.userService.addUser(this.newUserForm.value)
      .subscribe((response: HttpResponse<any>) => {
        if (response.status === 200) {
          this.closeModal();
          this.openSuccessSwal();
        }
      }, (error) => {
        this.closeModal();
        this.showMessage = error.error['message']
        this.openUnscuccessSwal();
      })
  }

  openSuccessSwal() {
    swal({
      title: 'Successful!',
      text: 'User created successfully!',
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

  cancelNewUserAddition() {
    this.newUserForm.reset();
    this.closeModal();
  }

  clearModal() {
    this.newUserForm.reset();
  }

  onRoleSelect() {
    if (this.newUserForm.value.role == "SubAdmin") {
      this.showPermissionFlag = true;
    }
    else {
      this.showPermissionFlag = false;
    }
  }

  OnItemDeSelect(item: any) {

  }
  onSelectAll(items: any) {

  }

  onDeSelectAll(items: any) {

  }

  onItemSelectCat(item: any) {

  }

}

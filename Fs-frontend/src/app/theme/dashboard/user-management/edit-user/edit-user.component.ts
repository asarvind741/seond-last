import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';
import { FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../../../services/user.servivce';
import { HttpResponse } from '@angular/common/http';
import { element } from '@angular/core/src/render3';
import { Item } from 'angular2-multiselect-dropdown';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  updateUserForm: FormGroup;
  showMessage: any;
  statuss: Array<String> = ['Active', 'Inactive'];
  roles: Array<String> = ['Buyer', 'Seller', 'Admin', 'SubAdmin'];
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
  @Input() currentUser;
  constructor(
    public activeModal: NgbActiveModal,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    console.log("current user", this.currentUser);
    let firstName = this.currentUser.firstName ? this.currentUser.firstName : '';
    let lastName = this.currentUser.lastName ? this.currentUser.lastName : '';
    let email = this.currentUser.email ? this.currentUser.email : '';
    let password = this.currentUser.password ? this.currentUser.password : '';
    let status = this.currentUser.status ? this.currentUser.status : '';
    let mobile = this.currentUser.mobile ? this.currentUser.mobile : null;
    let role = this.currentUser.role ? this.currentUser.role : null;
    let permissionss = this.currentUser.permissions ? this.currentUser.permissions : null;


    if (permissionss) {
      let temp = []
      console.log("--------------------->>>", permissionss)
      if (permissionss.isAdmin == true) temp.push('isAdmin');
      if (permissionss.isSubAdmin == true) temp.push('isSubAdmin');
      if (permissionss.isBuyer == true) temp.push('isBuyer');
      if (permissionss.isSupplier == true) temp.push('isSupplier');
      if (permissionss.isReseller == true) temp.push('isReseller');
      if (permissionss.isAgent == true) temp.push('isAgent');
      if (permissionss.isAccountAdmin == true) temp.push('isAccountAdmin');
      temp.forEach((element, index) => {
        let item = { 'id': index + 1, 'itemName': element };
        this.selectedPermission.push(item);
      });
    }

    this.updateUserForm = new FormGroup({
      'firstName': new FormControl(firstName),
      'lastName': new FormControl(lastName),
      'email': new FormControl(email),
      'password': new FormControl(password),
      'status': new FormControl(status),
      'mobile': new FormControl(mobile),
      'role': new FormControl(role),
      'permissions': new FormControl(permissionss)
    })
    this.onRoleSelect();
  }

  updateUser() {
    let permission = { isAdmin: false, isSubAdmin: false, isBuyer: false, isSupplier: false, isReseller: false, isAgent: false, isAccountAdmin: false }
    if (this.selectedPermission.length > 0 && this.updateUserForm.value.role == 'SubAdmin') {
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
    this.updateUserForm.value.permissions = permission;
    this.userService.updateUser(this.currentUser._id, this.updateUserForm.value)
      .subscribe((response: HttpResponse<any>) => {
        if (response.status === 200) {
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

  cancelNewUserAddition() {
    this.updateUserForm.reset();
    this.closeModal();
  }

  clearModal() {
    this.updateUserForm.reset();
  }


  onRoleSelect() {
    if (this.updateUserForm.value.role == "SubAdmin") {
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

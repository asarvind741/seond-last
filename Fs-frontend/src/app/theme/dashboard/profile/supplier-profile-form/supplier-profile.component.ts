import {Component, OnInit, Input} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import swal from 'sweetalert2';
import {animate, style, transition, trigger} from '@angular/animations';
import { UserService } from '../../../../services/user.servivce';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-supplier-profile',
  templateUrl: './supplier-profile.component.html',
  styleUrls: [
    './supplier-profile.component.scss',
    '../../../../../assets/icon/icofont/css/icofont.scss'
  ],
  animations: [
    trigger('fadeInOutTranslate', [
      transition(':enter', [
        style({opacity: 0}),
        animate('400ms ease-in-out', style({opacity: 1}))
      ]),
      transition(':leave', [
        style({transform: 'translate(0)'}),
        animate('400ms ease-in-out', style({opacity: 0}))
      ])
    ])
  ]
})
export class SupplierProfileComponent implements OnInit {
  editProfile = true;
  editProfileIcon = 'icofont-edit';
  myProfileForm: FormGroup;

  editAbout = true;
  editAboutIcon = 'icofont-edit';

  public editor;
  public editorContent: string;

  public data: any;
  public rowsOnPage = 10;
  public filterQuery = '';
  public sortBy = '';
  public sortOrder = 'desc';
  profitChartOption: any;
  userId: any;
  rowsContact = [];
  loadingIndicator = true;
  reorderable = true;
  statuss: Array<String> = ['Married', 'Single'];
  @Input('user') currentUser: any;

  constructor(
    private userService: UserService
  ) {
  }

  ngOnInit() {
    this.createForm();
  }

  createForm(){
    console.log("current user", this.currentUser)
    let name = this.currentUser.name ? this.currentUser.name: ''
    let firstName = this.currentUser.firstName ? this.currentUser.firstName : '';
    let lastName = this.currentUser.lastName ? this.currentUser.lastName : '';
    let email = this.currentUser.email ? this.currentUser.email : '';
    let gender = this.currentUser.gender ? this.currentUser.gender : '';
    let password = this.currentUser.password ? this.currentUser.password : '';
    let meritalStatus = this.currentUser.meritalStatus ? this.currentUser.meritalStatus :'';
    let status = this.currentUser.status ? this.currentUser.status: '';
    let mobile = this.currentUser.mobile ? this.currentUser.mobile : '';
    let address = this.currentUser.address ? this.currentUser.address : '';
    let dateOfBirth = this.currentUser.dateOfBirth ? this.currentUser.dateOfBirth: '';
    let linkedInId = this.currentUser.linkedInId ? this.currentUser.linkedInId : '';
    let websiteAddress = this.currentUser.websiteAddress ? this.currentUser.websiteAddress: '';
    this.myProfileForm = new FormGroup({
      'firstName': new FormControl(firstName),
      'lastName': new FormControl(lastName),
      'name': new FormControl(name),
      'email': new FormControl(email),
      'password': new FormControl(password),
      'status': new FormControl(status),
      'mobile': new FormControl(mobile),
      'gender': new FormControl(gender),
      'address': new FormControl(address),
      'linkedInId': new FormControl(linkedInId),
      'websiteAddress': new FormControl(websiteAddress),
      'meritalStatus': new FormControl(meritalStatus),
      'dateOfBirth': new FormControl(dateOfBirth)
    })
  }

  

  toggleEditProfile() {
    this.editProfileIcon = (this.editProfileIcon === 'icofont-close') ? 'icofont-edit' : 'icofont-close';
    this.editProfile = !this.editProfile;
  }

  toggleEditAbout() {
    this.editAboutIcon = (this.editAboutIcon === 'icofont-close') ? 'icofont-edit' : 'icofont-close';
    this.editAbout = !this.editAbout;
  }

  onSubmit(){
    console.log("this form values", this.myProfileForm.value);
    this.userService.updateUser(this.currentUser._id, this.myProfileForm.value)
    .subscribe((response: HttpResponse<any>) => {
      if(response.status === 200){
        this.userService.getUser(this.currentUser._id)
        .subscribe((response: HttpResponse<any>) => {
          if(response.status === 200){
            this.currentUser = response['data']
          }
        })
        this.openSuccessSwal()
      }
    }, (err: HttpResponse<any>) => {
      this.openUnscuccessSwal();
    })
    

  }

  openSuccessSwal() {
    swal({
      title: 'Successful!',
      text: 'Coupon updated successfully!',
      type: 'success'
    }).catch(swal.noop);
  }

  openUnscuccessSwal() {
    swal({
      title: 'Cancelled!',
      text: "Error Occured",
      type: 'error'
    }).catch(swal.noop);
  }

}

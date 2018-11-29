import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
import swal from 'sweetalert2';
import { animate, style, transition, trigger } from '@angular/animations';
import { UserService } from '../../../services/user.servivce';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: [
    './company-profile.component.scss',
    '../../../../assets/icon/icofont/css/icofont.scss'
  ],
  animations: [
    trigger('fadeInOutTranslate', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('400ms ease-in-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ transform: 'translate(0)' }),
        animate('400ms ease-in-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class CompanyProfileComponent implements OnInit {
  editProfile = true;
  editProfileIcon = 'icofont-edit';
  companyProfile: FormGroup;

  editAbout = true;
  editAboutIcon = 'icofont-edit';
  editAddress = true;
  editAddressIcon = 'icofont-edit';

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


  constructor(
    private userService: UserService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    // console.log("current user", this.currentUser.address);
    // let address1 = this.fb.array([]);
    let address = new FormArray([]);
    // if (this.currentUser['address']) {
    //   for(let addr of this.currentUser['address'])
    //    {
    //     address.push(
    //       new FormGroup({
    //         'line1': new FormControl(addr.line1),
    //         'line2': new FormControl(addr.line2),
    //         'city': new FormControl(addr.city),
    //         'postalCode': new FormControl(addr.postalCode),
    //         'country': new FormControl(addr.country)
    //       })
    //     );
    //   }
    // }
    // let name = this.currentUser.name ? this.currentUser.name : ''
    // let firstName = this.currentUser.firstName ? this.currentUser.firstName : '';
    // let lastName = this.currentUser.lastName ? this.currentUser.lastName : '';
    // let email = this.currentUser.email ? this.currentUser.email : '';
    // let gender = this.currentUser.gender ? this.currentUser.gender : '';
    // let meritalStatus = this.currentUser.meritalStatus ? this.currentUser.meritalStatus : '';
    // let status = this.currentUser.status ? this.currentUser.status : '';
    // let mobile = this.currentUser.mobile ? this.currentUser.mobile : '';
    // let dateOfBirth = this.currentUser.dateOfBirth ? this.currentUser.dateOfBirth : '';
    // let linkedInId = this.currentUser.linkedInId ? this.currentUser.linkedInId : '';
    // let websiteAddress = this.currentUser.websiteAddress ? this.currentUser.websiteAddress : '';
    // let description = this.currentUser.description ? this.currentUser.description : '';
    this.companyProfile = new FormGroup({
      'firstName': new FormControl(null),
      'lastName': new FormControl(null),
      'name': new FormControl(null),
      'email': new FormControl(null),
      'status': new FormControl(null),
      'mobile': new FormControl(null),
      'gender': new FormControl(null),
      'address': new FormControl(null),
      'linkedInId': new FormControl(null),
      'websiteAddress': new FormControl(null),
      'meritalStatus': new FormControl(null),
      'dateOfBirth': new FormControl(null),
      'description': new FormControl(null)
    })
  }



  toggleEditProfile() {
    this.editProfileIcon = (this.editProfileIcon === 'icofont-close') ? 'icofont-edit' : 'icofont-close';
    this.editProfile = !this.editProfile;
  }

  toggleEditAddress() {
    this.editAddressIcon = (this.editAddressIcon === 'icofont-close') ? 'icofont-edit' : 'icofont-close';
    this.editAddress = !this.editAddress;
  }

  toggleEditAbout() {
    this.editAboutIcon = (this.editAboutIcon === 'icofont-close') ? 'icofont-edit' : 'icofont-close';
    this.editAbout = !this.editAbout;
  }

  onSubmit() {
    // const values = this.companyProfile.value;
    // this.userService.updateUser(this.currentUser._id, values)
    //   .subscribe((response: HttpResponse<any>) => {
    //     if (response.status === 200) {
    //       console.log("response", response)
    //       this.userService.getUser(this.currentUser._id)
    //         .subscribe((response: HttpResponse<any>) => {
    //           if (response.status === 200) {
    //             this.currentUser = response['data']
    //           }
    //         })
    //       this.openSuccessSwal()
    //     }
    //   }, (error: HttpResponse<any>) => {
    //     console.log("error", error)
    //     this.openUnscuccessSwal();
    //   })


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
      text: "Error Occured",
      type: 'error'
    }).catch(swal.noop);
  }

}

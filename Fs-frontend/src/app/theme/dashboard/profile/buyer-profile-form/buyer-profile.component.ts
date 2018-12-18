import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
import swal from 'sweetalert2';
import { animate, style, transition, trigger } from '@angular/animations';
import { UserService } from '../../../../services/user.servivce';
import { AuthenticationService } from '../../../../services/auth.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { CompanyService } from '../../../../services/company.service';

@Component({
  selector: 'app-buyer-profile',
  templateUrl: './buyer-profile.component.html',
  styleUrls: [
    './buyer-profile.component.scss',
    '../../../../../assets/icon/icofont/css/icofont.scss'
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
export class BuyerProfileComponent implements OnInit {
  editProfile = true;
  editProfileIcon = 'icofont-edit';
  myProfileForm: FormGroup;

  editAbout = true;
  editAboutIcon = 'icofont-edit';
  editAddress = true;
  editAddressIcon = 'icofont-edit';
  editCompany = true;
  editCompanyIcon = 'iconfont-edit';


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
  isAddressAvailable: Boolean = false;
  @Input('user') currentUser: any;
  currentUserComapany: any;

  constructor(
    private userService: UserService,
    private authService: AuthenticationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private companyService: CompanyService
  ) {
  }

  ngOnInit() {
    this.currentUserComapany = {};
    this.companyService.getCompany(JSON.parse(localStorage.getItem('currentUser'))['company'])
      .subscribe((response: HttpResponse<any>) => {
        if (response.status === 200) {
          this.currentUserComapany = response['data'];
          if(!this.currentUserComapany.primaryAdmin){
            this.currentUserComapany.primaryAdmin.name == 'N/A'
          }
          if(!this.currentUserComapany.name){
            this.currentUserComapany.name = "N/A"
          }
        }
      })
    this.createForm();
  }

  createForm() {
    // let address1 = this.fb.array([]);
    let address = new FormArray([]);
    if (this.currentUser['address'].length > 0) {
      this.isAddressAvailable = true;
      for (let addr of this.currentUser['address']) {
        address.push(
          new FormGroup({
            'line1': new FormControl(addr.line1),
            'line2': new FormControl(addr.line2),
            'city': new FormControl(addr.city),
            'postalCode': new FormControl(addr.postalCode),
            'country': new FormControl(addr.country)
          })
        );
      }
    }
    let name = this.currentUser.name ? this.currentUser.name : ''
    let firstName = this.currentUser.firstName ? this.currentUser.firstName : '';
    let lastName = this.currentUser.lastName ? this.currentUser.lastName : '';
    let email = this.currentUser.email ? this.currentUser.email : '';
    let gender = this.currentUser.gender ? this.currentUser.gender : '';
    let meritalStatus = this.currentUser.meritalStatus ? this.currentUser.meritalStatus : '';
    let status = this.currentUser.status ? this.currentUser.status : '';
    let mobile = this.currentUser.mobile ? this.currentUser.mobile : '';
    let dateOfBirth = this.currentUser.dateOfBirth ? this.currentUser.dateOfBirth : '';
    let linkedInId = this.currentUser.linkedInId ? this.currentUser.linkedInId : '';
    let websiteAddress = this.currentUser.websiteAddress ? this.currentUser.websiteAddress : '';
    let description = this.currentUser.description ? this.currentUser.description : '';
    this.myProfileForm = new FormGroup({
      'firstName': new FormControl(firstName),
      'lastName': new FormControl(lastName),
      'name': new FormControl(name),
      'email': new FormControl(email),
      'status': new FormControl(status),
      'mobile': new FormControl(mobile),
      'gender': new FormControl(gender),
      'address': address,
      'linkedInId': new FormControl(linkedInId),
      'websiteAddress': new FormControl(websiteAddress),
      'meritalStatus': new FormControl(meritalStatus),
      'dateOfBirth': new FormControl(dateOfBirth),
      'description': new FormControl(description)
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

  addAddress() {
    this.isAddressAvailable = true;
    this.editAddressIcon = (this.editAddressIcon === 'icofont-close') ? 'icofont-edit' : 'icofont-close';
    this.editAddress = !this.editAddress;
    const control = new FormGroup({
      'line1': new FormControl(null),
      'line2': new FormControl(null),
      'city': new FormControl(null),
      'postalCode': new FormControl(null),
      'country': new FormControl(null)
    });
    (<FormArray>this.myProfileForm.get('address')).push(control);
  }

  toggleEditAbout() {
    this.editAboutIcon = (this.editAboutIcon === 'icofont-close') ? 'icofont-edit' : 'icofont-close';
    this.editAbout = !this.editAbout;
  }

  showCompanyForm() {
    this.authService.currentLoggingUserSubject.next(this.currentUser);
    this.router.navigate(['../../company-profile'], { relativeTo: this.activatedRoute })
  }

  onSubmit() {
    this.isAddressAvailable = true;
    const values = this.myProfileForm.value;
    this.userService.updateUser(this.currentUser._id, values)
      .subscribe((response: HttpResponse<any>) => {
        if (response.status === 200) {
          this.userService.getUser(this.currentUser._id)
            .subscribe((response: HttpResponse<any>) => {
              if (response.status === 200) {
                this.currentUser = response['data']
              }
            })
          this.openSuccessSwal();
          if (!this.editAbout) {
            this.toggleEditAbout();
          }
          else if (!this.editAddress) {
            this.toggleEditAddress()
          }
          else if (!this.editProfile) {
            this.toggleEditProfile()
          }
        }
      }, (error: HttpResponse<any>) => {
        this.openUnscuccessSwal();
      })


  }

  openSuccessSwal() {
    swal({
      title: 'Successful!',
      text: 'Profile updated successfully!',
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

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
import swal from 'sweetalert2';
import { animate, style, transition, trigger } from '@angular/animations';
import { AuthenticationService } from '../../../services/auth.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { CompanyService } from '../../../services/company.service';

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
  editCompany = true;
  editAbout = true;
  editAddress = true;
  editAddressIcon = 'icofont-edit';
  isAddressAvailable: Boolean = false;
  isCompanyAvailable: Boolean = false;;
  editAboutIcon = 'icofont-edit'
  editCompanyIcon = 'icofont-edit';
  companyProfileForm: FormGroup;


  public editor;
  public editorContent: string;

  public data: any;
  public rowsOnPage = 10;
  public filterQuery = '';
  public sortBy = '';
  public sortOrder = 'desc';
  profitChartOption: any;
  rowsContact = [];
  loadingIndicator = true;
  reorderable = true;
  company: any;
  currentUser: any;

  constructor(
    private companyService: CompanyService,
    private authService: AuthenticationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.companyService.getCompany(this.currentUser['company'])
      .subscribe((response: HttpResponse<any>) => {
        if (response.status === 200) {
          this.company = response['data'];
            this.isAddressAvailable = true;
         if (!this.company) {
           this.isAddressAvailable = false;
            this.company = {
              name: "N/A",
              primaryAdmin: "N/A",
              description: "N/A",
              subscription: { name: "N/A", maximumNoOfUsers: 0 },
              subscriptionLastDate: "N/A",
              subscriptionBilledAmount: "N/A",
              createdBy: "N/A",
              toalEmployees: 4000,
              address: {
                line1: "N/A",
                line2: "N/A",
                postalCode: 12345,
                city: "N/A",
                state: "N/A",
                country: "N/A"
              }

            }
          }
          this.createForm();
        }
        else {

        }
      }, (error: HttpErrorResponse) => {
      })

  }

  createForm() {
    let address = new FormArray([]);
    if (this.company['address'].length > 0) {
      this.isAddressAvailable = true;
      for (let addr of this.company['address']) {
        address.push(
          new FormGroup({
            'line1': new FormControl(addr.line1),
            'line2': new FormControl(addr.line2),
            'city': new FormControl(addr.city),
            'state': new FormControl(addr.state),
            'postalCode': new FormControl(addr.postalCode),
            'country': new FormControl(addr.country)
          })
        );
      }
    }

    if (!!this.company) {
      this.isCompanyAvailable = true;
      let name = this.company.name ? this.company.name : '';
      let primaryAdmin = this.company.primaryAdmin ? this.company.primaryAdmin : '';
      let description = this.company.description ? this.company.description : '';
      let subscription = this.company.subscription ? this.company.subscription : '';
      let subscriptionLastDate = this.company.subscriptionLastDate ? this.company.subscriptionLastDate : '';
      let subscriptionBilledAmount = this.company.subscriptionBilledAmount ? this.company.subscriptionBilledAmount : '';
      let members = this.company.members ? this.company.members : '';
      let createdBy = this.company.createdBy ? this.company.createdBy : '';
      let toalEmployees = this.company.toalEmployees ? this.company.toalEmployees : '';

      this.companyProfileForm = new FormGroup({
        'name': new FormControl(name),
        'address': address,
        'primaryAdmin': new FormControl(primaryAdmin.name),
        'description': new FormControl(description),
        'subscription': new FormControl(subscription),
        'maximumNoOfUsers': new FormControl(subscription.maximumNoOfUsers),
        'subscriptionName': new FormControl(subscription.name),
        'subscriptionLastDate': new FormControl(subscriptionLastDate),
        'subscriptionBilledAmount': new FormControl(subscriptionBilledAmount),
        'members': new FormControl(members),
        'toalEmployees': new FormControl(toalEmployees),
        'createdBy': new FormControl(createdBy)
      })
    }
  }



  toggleEditCompanyProfile() {
    this.editCompanyIcon = (this.editCompanyIcon === 'icofont-close') ? 'icofont-edit' : 'icofont-close';
    this.editCompany = !this.editCompany;
  }

  toggleEditAbout() {
    this.editAboutIcon = (this.editAboutIcon === 'icofont-close') ? 'icofont-edit' : 'icofont-close';
    this.editAbout = !this.editAbout;
  }

  toggleEditAddress() {
    this.isAddressAvailable = true;
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
      'state': new FormControl(null),
      'country': new FormControl(null)
    });
    (<FormArray>this.companyProfileForm.get('address')).push(control);
  }



  showCompanyForm() {
    this.router.navigate(['../../company-profile'], { relativeTo: this.activatedRoute })
  }

  getCompanyDetails(){
    this.companyService.getCompany(this.currentUser['company'])
    .subscribe((response: HttpResponse<any>) => {
      if(response.status === 200){
        this.company = response['data']
      }
      else {
        this.openUnscuccessSwal();
      }
    })
  }

  onSubmit() {
    this.company.primaryAdmin.name = this.companyProfileForm.value.primaryAdmin;
    this.companyProfileForm.value.primaryAdmin = this.company.primaryAdmin;
    this.isAddressAvailable = true;
    const values = this.companyProfileForm.value;
    this.companyService.updateCompany(this.currentUser.company, values)
      .subscribe((response: HttpResponse<any>) => {
        if (response.status === 200) {
          this.openSuccessSwal();
          this.getCompanyDetails();
          if (!this.editAddress) {
            this.toggleEditAddress();
          }
          else if (!this.editCompany) {
            this.toggleEditCompanyProfile()
          }
          else if (!this.editAbout) {
            this.toggleEditAbout()
          }
        }
        else {
          this.openUnscuccessSwal();
        }
      }, (error: HttpResponse<any>) => {
        this.openUnscuccessSwal();
      })


  }

  openSuccessSwal() {
    swal({
      title: 'Successful!',
      text: 'Company updated successfully!',
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

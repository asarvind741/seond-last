import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
import swal from 'sweetalert2';
import { animate, style, transition, trigger } from '@angular/animations';
import { UserService } from '../../../services/user.servivce';
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
  isCompanyAvailable: Boolean = false;;
  editAboutIcon = 'iconfont-edit'
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
    this.authService.currentLoggingUserSubject
      .subscribe(response => {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.companyService.getCompany(this.currentUser['company'])
          .subscribe((response: HttpResponse<any>) => {
            if (response.status === 200) {
              this.company = response['data'];
              if(!this.company){
                this.company = {
                  name: "Demo Pvt Ltd",
                  primaryAdmin: "Arvind Singh",
                  description: "Demo company created by Arvind Singh",
                  subscription: { name: "Test Subscription", maximumNoOfUsers: 100 },
                  subscriptionLastDate: "21/12/2018",
                  subscriptionBilledAmount: "$500",
                  members: ['1', '2', '3'],
                  createdBy: "Arvind SIngh",
                  toalEmployees: 4000,
                  address: {
                    line1: "Line 1 address",
                    line2: "Line 2 address",
                    postalCode: 201301,
                    city: "Noida",
                    state: "UP",
                    country: "India"
                  }

                }
              }
              this.createForm();
            }
            else {

            }
          }, (error: HttpErrorResponse) => {
          })
      })

  }

  createForm() {


    let address = new FormArray([]);
    if (this.company['address']) {
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
        'primaryAdmin': new FormControl(primaryAdmin),
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

    toggleEditAbout(){
      this.editAboutIcon = (this.editAboutIcon === 'icofont-close') ? 'icofont-edit' : 'icofont-close';
      this.editAbout = !this.editAbout;
    }



    showCompanyForm() {
      this.router.navigate(['../../company-profile'], { relativeTo: this.activatedRoute })
    }

    onSubmit() {
      const values = this.companyProfileForm.value;
      console.log("test", values);
      this.companyService.updateCompany(this.currentUser._id, values)
        .subscribe((response: HttpResponse<any>) => {
          if (response.status === 200) {
            console.log("response", response)
            this.companyService.getCompany(this.currentUser.company)
              .subscribe((response: HttpResponse<any>) => {
                if (response.status === 200) {
                  console.log("get company========>", response['data'])
                  this.currentUser['company'] = response['data']
                  this.openSuccessSwal();
                }
                else {
                  console.log("Inside else block")
                }
              })
          }
        }, (error: HttpResponse<any>) => {
          console.log("error", error)
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
        text: "Error Occured",
        type: 'error'
      }).catch(swal.noop);
    }

  }

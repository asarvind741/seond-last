import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { HttpResponse } from '@angular/common/http';
import { VatManagementService } from '../../../services/vat-management.service';

@Component({
  selector: 'app-vat-management',
  templateUrl: './vat-management.component.html',
  styleUrls: [
    './vat-management.component.scss',
    '../../../../assets/icon/icofont/css/icofont.scss'
  ]
})
export class VatManagementComponent implements OnInit {
  countries: Array<Object> = [];
  addClass: Boolean = false;
  selectedCountry: Object;
  constructor(
    private vatManagementService: VatManagementService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.getCountries();
  }
  ngOnInit() {

  }

  getCountries() {
    this.vatManagementService.getCountryList()
    .subscribe((response: HttpResponse<any>) => {
     if(response.status === 200){
       this.countries = response['data'];
     }
    })
  }

  selectCountry(country) {
    this.addClass = true;
    this.vatManagementService.selectedCountrySubject.next(country);
    // this.router.navigate([country.id], { relativeTo: this.activatedRoute});
  }

  

  

  openSuccessSwal() {
    swal({
      title: 'Successful!',
      text: 'Plan updated successfully!',
      type: 'success'
    }).catch(swal.noop);
  }

  openUnscuccessSwal() {
    swal({
      title: 'Cancelled!',
      text: 'Please try again',
      type: 'error'
    }).catch(swal.noop);
  }

 

  // openSuccessCancelSwal(name) {
  //   this.deleting = true;
  //   swal({
  //     title: 'Are you sure?',
  //     text: 'You not be able to revert this!',
  //     type: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Yes, deactivate it!',
  //     cancelButtonText: 'Not now!',
  //     confirmButtonClass: 'btn btn-success',
  //     cancelButtonClass: 'btn btn-danger mr-sm'
  //   }).then((result) => {
  //     if (result.value) {
  //       this.planService.modifyStatus(name._id).subscribe((response: HttpResponse<any>) => {
  //         console.log(response)
  //         if (response.status === 200) {
  //           this.getPlans();
  //           swal(
  //             'Deactivated!',
  //             'Your have deactivated coupon successfully.',
  //             'success'
  //           );
  //         }
  //       });

  //     } else if (result.dismiss) {
  //       swal(
  //         'Cancelled',
  //         'Deactivation request cancelled.)',
  //         'error'
  //       );
  //     }
  //   });
  //   this.deleting = false;

  // }
}

import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CouponService } from '../../../services/coupon.service';
import { HttpResponse } from '@angular/common/http';
import { EditRestfulComponent } from './edit-restful/edit-restful.component';
import * as moment from 'moment';

@Component({
  selector: '<app-restful-management></app-restful-management>',
  templateUrl: './restful-management.component.html',
  styleUrls: [
    './restful-management.component.scss',
    '../../../../assets/icon/icofont/css/icofont.scss'
  ]
})
export class RestfulManagementComponent implements OnInit {
  deleting: Boolean;
  showMessage: any;
  constructor(
    private couponService: CouponService,
    private modalService: NgbModal
  ) {
    this.getCoupons();
  }
  search_input: string = null;
  editing = {};
  rows = [];
  temp_rows = [];
  ngOnInit() {
  }

  getCoupons() {
    this.couponService.getCoupons()
      .subscribe(coupons => {
        this.rows = coupons['data'];
        this.temp_rows = coupons['data'];
      })
  }

  openFormModal(){
    
  }

  onSearchInputChange(val) {
    if (val) {
      val = val.toLowerCase();
      let data = this.temp_rows;
      data = data.filter(coupon => {
        if (
          coupon.name && coupon.name.toLowerCase().indexOf(val) >= 0 ? true : false ||
            coupon.module && coupon.module.toLowerCase().indexOf(val) >= 0 ? true : false ||
              coupon.discount && coupon.discount.toString().indexOf(val) >= 0 ? true : false ||
                coupon.status && coupon.status.toLowerCase().indexOf(val) >= 0 ? true : false ||
                  coupon.expiresOn && moment(coupon.expiresOn).format("MMM DD, YYYY").toLowerCase().indexOf(val) >= 0 ? true : false
        )
          return true;
      });
      this.rows = data;
    } else this.rows = this.temp_rows;
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
      text: this.showMessage,
      type: 'error'
    }).catch(swal.noop);
  }

  activateCouppon(name) {

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
        this.couponService.modifyStatus(name._id).subscribe((response: HttpResponse<any>) => {
          if (response.status === 200) {
            this.getCoupons();
            swal(
              'Success!',
              'Your have activated coupon successfully.',
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

  openSuccessCancelSwal(name) {
    this.deleting = true;
    swal({
      title: 'Are you sure?',
      text: 'You not be able to revert this!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, deactivate it!',
      cancelButtonText: 'Not now!',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger mr-sm'
    }).then((result) => {
      if (result.value) {
        this.couponService.modifyStatus(name._id).subscribe((response: HttpResponse<any>) => {
          if (response.status === 200) {
            this.getCoupons();
            swal(
              'Deleted!',
              'Your have deactivated coupon successfully.',
              'success'
            );
          }
        });

      } else if (result.dismiss) {
        swal(
          'Cancelled',
          'You have cancelled deactivation request.)',
          'error'
        );
      }
    });
    this.deleting = false;

  }
  openEditFormModal(coupon) {
    const modalRef = this.modalService.open(EditRestfulComponent);
    modalRef.componentInstance.currentCoupon = coupon;
    modalRef.result.then((result) => {
      this.getCoupons();
    })
      .catch((error) => {
        this.getCoupons();
      });
  }

  deleteCoupon(coupon) {
    swal({
      title: 'Are you sure to delete coupon?',
      text: 'You not be able to revert this!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Not now!',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger mr-sm'
    }).then((result) => {
      if (result.value) {
        this.couponService.deleteCoupon(coupon._id).subscribe((response: HttpResponse<any>) => {
          if (response.status === 200) {
            this.getCoupons();
            swal(
              'Success!',
              'Your have deleted coupon successfully.',
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
}

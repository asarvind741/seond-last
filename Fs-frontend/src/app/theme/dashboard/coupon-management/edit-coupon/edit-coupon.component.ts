import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';
import { FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { CouponService } from '../../../../services/coupon.service';
import * as moment from 'moment';

@Component({
  selector: 'app-edit-coupon',
  templateUrl: './edit-coupon.component.html',
  styleUrls: ['./edit-coupon.component.scss']
})
export class EditCouponComponent implements OnInit {
  editCouponForm: FormGroup;
  showMessage: any;
  statuss: Array<String> = ['Active', 'Inactive'];
  modules: Array<String> = ['First Module', 'Second Module', 'Third Module']
  @Input() currentCoupon;
  constructor(
    public activeModal: NgbActiveModal,
    private couponService: CouponService
    ) { }

  ngOnInit() {
    
    this.createForm();
  }

  createForm(){
    let name = this.currentCoupon.name ? this.currentCoupon.name : '';
    let module = this.currentCoupon.module ? this.currentCoupon.module : 'Select One';
    let discount = this.currentCoupon.discount ? this.currentCoupon.discount : '';
    let expiresOn = this.currentCoupon.expiresOn ? this.currentCoupon.expiresOn : null;
    let status = this.currentCoupon.status ? this.currentCoupon.status : null;
    let noOfUsersAllowed = this.currentCoupon.noOfUsersAllowed ? this.currentCoupon.noOfUsersAllowed: null;
    let description = this.currentCoupon.description ? this.currentCoupon.description: '';

    this.editCouponForm = new FormGroup({
      'name': new FormControl(name, [Validators.required]),
      'module': new FormControl(module, [ Validators.required ]),
      'discount': new FormControl(discount, [Validators.required, Validators.min(1), Validators.max(100)]),
      'expiresOn': new FormControl(expiresOn, [ Validators.required]),
      'status': new FormControl(status),
      'noOfUsersAllowed': new FormControl(noOfUsersAllowed, [ Validators.min(1)]),
      'description': new FormControl(description)
    })

    this.editCouponForm.get('expiresOn').setValue({
      year: parseInt(moment(expiresOn).format('YYYY')),
      month: parseInt(moment(expiresOn).format('M')),
      day: parseInt(moment(expiresOn).format('D'))
    });
  }

  editCoupon(){
    this.couponService.updateCoupon(this.currentCoupon._id, this.editCouponForm.value)
    .subscribe((response: HttpResponse<any>) => {
      if(response.status === 200){
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

  closeModal() {
    this.activeModal.close('Modal Closed');
  }

  cancelNewUserAddition(){
    this.editCouponForm.reset();
    this.closeModal();
  }

  clearModal(){
    this.editCouponForm.reset();
  }

}

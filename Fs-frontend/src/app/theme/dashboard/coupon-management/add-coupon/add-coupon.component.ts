import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';
import { FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
import { CouponService } from '../../../../services/coupon.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-coupon',
  templateUrl: './add-coupon.component.html',
  styleUrls: ['./add-coupon.component.scss']
})
export class AddCouponComponent implements OnInit {
  newCouponForm: FormGroup;
  modules: Array<String> = ['First Module', 'Second Module', 'Third Module'];
  statuss: Array<String> = ['Active', 'Inactive'];
  showMessage: any;
  constructor(
    public activeModal: NgbActiveModal,
    private couponService: CouponService
  ) { }

  ngOnInit() {

    this.createForm();
  }

  createForm() {
    this.newCouponForm = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'module': new FormControl(null, [ Validators.required ]),
      'discount': new FormControl(null, [Validators.required, Validators.min(1), Validators.max(100)]),
      'expiresOn': new FormControl(null, [ Validators.required]),
      'status': new FormControl(null),
      'noOfUsersAllowed': new FormControl(null, [ Validators.min(1)]),
      'description': new FormControl(null)
    })
  }

  addNewCoupon() {
    console.log(this.newCouponForm.value)
    this.couponService.addCoupon(this.newCouponForm.value).subscribe((response: HttpResponse<any>) => {
        if (response.status === 200) {
          this.closeModal();
          this.openSuccessSwal();
        }
        else if (response.status !== 200) {
          this.closeModal();
          this.showMessage = response['date'];
          this.openUnscuccessSwal();
        }
      }, (error) => {
        console.log(error);
        this.closeModal();
        this.showMessage = error.error['message']
        this.openUnscuccessSwal();
      })

  }

  onSelectValue(event) {
    console.log("value", this.newCouponForm.value)
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
    this.newCouponForm.reset();
    this.closeModal();
  }

  clearModal() {
    this.newCouponForm.reset();
  }

}

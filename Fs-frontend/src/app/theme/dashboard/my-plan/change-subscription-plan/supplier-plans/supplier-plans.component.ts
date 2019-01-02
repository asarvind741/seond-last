import { Component, OnInit, Input, ViewChild, ElementRef, HostListener, Renderer2 } from '@angular/core';
import swal from 'sweetalert2';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { PlanService } from '../../../../../services/plan.service';
@Component({
  selector: 'app-supplier-plans',
  templateUrl: './supplier-plans.component.html',
  styleUrls: ['./supplier-plans.component.scss']
})
export class SupplierPlansComponent implements OnInit {


  active1 = true;
  applyClass = 1;
  showMessage: any;
  @Input('userRole') userRole: any;
  @Input('plans') plans: any;
  @Input('currentUser') currentUser: any;
  @ViewChild('supplier1') supplier1: ElementRef;
  @ViewChild('supplier2') supplier2: ElementRef;
  @ViewChild('stockist1') stockist1: ElementRef;
  @ViewChild('stockist2') stockist2: ElementRef;
  @ViewChild('reseller1') reseller1: ElementRef;
  @ViewChild('reseller2') reseller2: ElementRef;
  @ViewChild('popupDiv') popupDiv: ElementRef;

  @HostListener('click', ['$event'])
  onclick(event: MouseEvent) {

  }
  constructor(
    private renderer: Renderer2,
    private planService: PlanService
  ) { }
  ngOnInit() {
  }

  classToApply(event) {
    if (event.target.text === "supplier")
      this.applyClass = 1;
    else if (event.target.text === "stockist")
      this.applyClass = 2;
    else
      this.applyClass = 3;
  }

  onMouseOver() {
    this.renderer.setStyle(this.popupDiv.nativeElement, 'display', 'block')
  }

  onMouseLeave() {
    this.renderer.setStyle(this.popupDiv.nativeElement, 'display', 'none')
  }
  changePlan(id) {
    this.planService.changePlan(this.currentUser.company, id)
      .subscribe((response: HttpResponse<any>) => {
        if (response.status === 200) {
          this.showMessage = "Plan changed succesfully";
          this.openSuccessSwal();
        }
        else {
          this.openUnscuccessSwal();
        }
      }, (error: HttpErrorResponse) => {
        this.openUnscuccessSwal();
      })
  }
  
  openUnscuccessSwal() {
    swal({
      title: 'Cancelled!',
      text: "Error Occured",
      type: 'error'
    }).catch(swal.noop);
  }

  openSuccessSwal() {
    swal({
      title: 'Successful!',
      text: this.showMessage,
      type: 'success'
    }).catch(swal.noop);
  }

}




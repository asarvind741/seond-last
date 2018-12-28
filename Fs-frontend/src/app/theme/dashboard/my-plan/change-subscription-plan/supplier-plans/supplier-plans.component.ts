import { Component, OnInit, Input, ViewChild, ElementRef, HostListener, Renderer2 } from '@angular/core';
@Component({
  selector: 'app-supplier-plans',
  templateUrl: './supplier-plans.component.html',
  styleUrls: ['./supplier-plans.component.scss']
})
export class SupplierPlansComponent implements OnInit {


  active1 = true;
  applyClass = 1;
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
  constructor(private renderer: Renderer2) { }
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

}




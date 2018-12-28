import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-supplier-plans',
  templateUrl: './supplier-plans.component.html',
  styleUrls: ['./supplier-plans.component.scss']
})
export class SupplierPlansComponent implements OnInit {

  @Input('userRole') userRole: any;
  @Input('plans') plans: any;
  @Input('currentUser') currentUser: any;
  showMessage: any;

  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { UserService } from '../../../services/user.servivce';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-contact-supplier',
  templateUrl: './contact-supplier.component.html',
  styleUrls: ['./contact-supplier.component.scss']
})
export class ContactSupplierComponent implements OnInit {

  companyId: any;
  supplier: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) { 
    this.activatedRoute.queryParams
    .subscribe((params: Params) => {
      this.companyId = params['supplierId'];
      this.userService.getSupplierDetails(this.companyId)
      .subscribe((response) => {
        if(response['status'] === 200){
          this.supplier = response['data']
        }
      })
    })
  }

  ngOnInit() {
  }

}

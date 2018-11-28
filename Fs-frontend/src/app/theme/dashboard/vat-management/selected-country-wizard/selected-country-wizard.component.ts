import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { VatManagementService } from '../../../../services/vat-management.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import swal from 'sweetalert2';

@Component({
  selector: 'app-selected-country-wizard',
  templateUrl: './selected-country-wizard.component.html',
  styleUrls: ['./selected-country-wizardcomponent.scss']
})
export class SelectedCountryWizardComponent implements OnInit {
  id: any;
  settings: Object;
  settings1: Object;
  settings2: Object;
  selectedCountry: Object;
  selectedStates: any;
  selectedPaymentMode: any;
  states: Array<Object> = [];
  vatForm: FormGroup;
  paymentMode = [
    { 'id': 1, 'itemName': 'Paypal' },
    { 'id': 2, 'itemName': 'Stripe' },
    { 'id': 3, 'itemName': 'Bank Transfer' }
  ]
  constructor(
    private activatedRoute: ActivatedRoute,
    private vatManagementService: VatManagementService
  ) {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.vatManagementService.selectedCountrySubject
      .subscribe((data) => {
        let element = { 'id': data['id'], 'name': data['name'] }
        this.selectedCountry = Object.assign({}, element);
      })
      
      this.states = [];
      this.vatManagementService.getStates(this.id)
        .subscribe((response: HttpResponse<any>) => {
          if (response.status === 200) {
            response['data'].forEach(state => {
              let element = { 'id': state['id'], 'itemName': state['name'] };
              this.states.push(element)
            })
          }
        })
    });


  }

  ngOnInit() {
    this.settings = {
      singleSelection: false,
      text: "Select State",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      badgeShowLimit: 3
    };


    this.settings2 = {
      singleSelection: false,
      text: "Select Payment Mode",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      badgeShowLimit: 3
    };

   
    this.createForm();
  }

  createForm() {
    let taxes = new FormArray([])
    this.vatForm = new FormGroup({
      country: new FormControl(this.selectedCountry),
      states: new FormControl([]),
      paymentMode: new FormControl([]),
      taxes: taxes
    })
  }

  onItemSelect(item: any) {
  }
  OnItemDeSelect(item: any) {
  }
  onSelectAll(items: any) {
  }
  onDeSelectAll(items: any) {
  }

  addNewTax() {
    const control = new FormGroup({
      'name': new FormControl(),
      'value': new FormControl()
    });
    (<FormArray>this.vatForm.get('taxes')).push(control);
  }

  onSubmit() {
    console.log("form values", this.vatForm.value)
   const data = this.vatForm.value;
   this.vatManagementService.createVat(data)
   .subscribe((response: HttpResponse<any>) => {
     if(response.status === 200){
       this.openSuccessSwal()
     }
     else {
       this.openUnscuccessSwal();
     }
   },(error: HttpResponse<any>) =>{
     this.openUnscuccessSwal();
   })
  }

  openSuccessSwal() {
    swal({
      title: 'Successful!',
      text: ' successfully!',
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

}

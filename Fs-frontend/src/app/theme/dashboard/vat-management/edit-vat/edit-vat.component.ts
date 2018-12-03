import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { VatManagementService } from '../../../../services/vat-management.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';

@Component({
  selector: 'app-edit-vat',
  templateUrl: './edit-vat.component.html',
  styleUrls: ['./edit-vat.component.scss']
})
export class EditVatComponent implements OnInit {
  @Input('currentVat') currentVat;
  id: any;
  settings: Object;
  settings1: Object;
  settings2: Object;
  selectedCountry: Object;
  selectedStates: any = [];
  selectedPaymentMode: any = [];
  states: Array<Object> = [];
  vatForm: FormGroup;
  paymentMode = [
    { 'id': 1, 'itemName': 'Paypal' },
    { 'id': 2, 'itemName': 'Stripe' },
    { 'id': 3, 'itemName': 'Bank Transfer' }
  ]
  constructor(
    private activatedRoute: ActivatedRoute,
    private vatManagementService: VatManagementService,
    private activeModal: NgbActiveModal
  ) {
  }

  ngOnInit() {

    let element = { 'id': this.currentVat.country['id'], 'name': this.currentVat.country['name'] }
    this.selectedCountry = Object.assign({}, element);

    this.currentVat.state.forEach(state => {
      if (state.name) {
        this.selectedStates.push({ 'id':  (state.id).toString(), 'itemName': (state.name).toString() });
      }
    })

    this.currentVat.paymentMode.forEach(payment => {
      if (payment.name) {
        let element = { 'id': payment.id, 'itemName': payment.name };
        this.selectedPaymentMode.push(element);
      }
    })

    this.vatManagementService.getStates(this.selectedCountry['id'])
      .subscribe((response: HttpResponse<any>) => {
        if (response.status === 200) {
          response['data'].forEach(data => {
            let element = { 'id': data.id, 'itemName': data.name }
            this.states.push(element);
          })
        }
      })

    console.log("selected statyes", this.selectedStates)


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
    if (this.currentVat.taxes) {
      this.currentVat.taxes.forEach(tax => {
        taxes.push(
          new FormGroup({
            'name': new FormControl(tax.name),
            'value': new FormControl(tax.value),
          })
        )
      })
    }
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
    const data = this.vatForm.value;
    data.country.id = this.selectedCountry['id'];
    data.country.name = this.selectedCountry['name'];
    data.states.forEach(element => {
      element.name = element.itemName;
      delete element.itemName
    });
    data.paymentMode.forEach(element => {
      element.name = element.itemName;
      delete element.itemName;
    });
    data.state = data.states;
    delete data.states;
    this.vatManagementService.editVat(data, this.currentVat._id)
      .subscribe((response: HttpResponse<any>) => {
        if (response.status === 200) {
          this.closeModal();
          this.openSuccessSwal();
        }
        else {
          this.closeModal();
          this.openUnscuccessSwal();
        }
      }, (error: HttpResponse<any>) => {
        this.openUnscuccessSwal();
      })
  }

  openSuccessSwal() {
    swal({
      title: 'Successful!',
      text: ' Vat updated successfully',
      type: 'success'
    }).catch(swal.noop);
  }

  openUnscuccessSwal() {
    swal({
      title: 'Cancelled!',
      text: 'Error occured',
      type: 'error'
    }).catch(swal.noop);
  }

  closeModal() {
    this.activeModal.close('Modal Closed');
  }
  clearModal() {
    this.vatForm.reset();
  }


}

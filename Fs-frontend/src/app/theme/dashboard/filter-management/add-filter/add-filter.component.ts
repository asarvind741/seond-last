import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';
import { FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { FilterService } from '../../../../services/filter.service';

@Component({
  selector: 'app-add-filter',
  templateUrl: './add-filter.component.html',
  styleUrls: ['./add-filter.component.scss']
})
export class AddFilterComponent implements OnInit {
  newFilterForm: FormGroup;
  filterTypes: Array<String> = ['Product', 'Subscription', 'Special'];
  statuss: Array<String> = ['Active', 'Inactive'];
  showMessage: any;
  constructor(
    public activeModal: NgbActiveModal,
    private filterService: FilterService
  ) { }

  ngOnInit() {

    this.createForm();
  }

  createForm() {
    let value = new FormArray([]);

    this.newFilterForm = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'type': new FormControl(null, [ Validators.required ]),
      'status': new FormControl(null, [Validators.required]),
      'value': value
    })
  }

  addNewFilter() {
    console.log(this.newFilterForm.value)
    this.filterService.addFilter(this.newFilterForm.value).subscribe((response: HttpResponse<any>) => {
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

  addNewValue(){
    const control = new FormControl(null);
    (<FormArray>this.newFilterForm.get('value')).push(control);
  }

  onSelectValue(event) {
    console.log("value", this.newFilterForm.value)
  }


  openSuccessSwal() {
    swal({
      title: 'Successful!',
      text: 'Filter created successfully!',
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
    this.newFilterForm.reset();
    this.closeModal();
  }

  clearModal() {
    this.newFilterForm.reset();
  }

}

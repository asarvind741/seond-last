import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';
import { FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { FilterService } from '../../../../services/filter.service';

@Component({
  selector: 'app-edit-filter',
  templateUrl: './edit-filter.component.html',
  styleUrls: ['./edit-filter.component.scss']
})
export class EditFilterComponent implements OnInit {
  editFilterForm: FormGroup;
  @Input('currentFilter') currentFilter;
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
    let name = this.currentFilter.name ? this.currentFilter.name : null;
    let type = this.currentFilter.type ? this.currentFilter.type : null;
    let status = this.currentFilter.status ? this.currentFilter.status: null;
    let value = new FormArray([]);
    if(this.currentFilter.value){
      this.currentFilter.value.forEach(val => {
        value.push(new FormControl(val))
      })
    }
    

    this.editFilterForm = new FormGroup({
      'name': new FormControl(name),
      'type': new FormControl(type),
      'status': new FormControl(status),
      'value': value
    })
  }

  editFilter() {
    this.filterService.updateFilter(this.currentFilter._id, this.editFilterForm.value).subscribe((response: HttpResponse<any>) => {
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
    (<FormArray>this.editFilterForm.get('value')).push(control);
  }

  onSelectValue(event) {
    console.log("value", this.editFilterForm.value)
  }


  openSuccessSwal() {
    swal({
      title: 'Successful!',
      text: 'Filter updated successfully!',
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
    this.editFilterForm.reset();
    this.closeModal();
  }

  clearModal() {
    this.editFilterForm.reset();
  }

}

import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { FeatureService } from '../../../../services/feature.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-feature',
  templateUrl: './add-feature-module.component.html',
  styleUrls: ['./add-feature-module.component.scss']
})
export class AddFeatureComponent implements OnInit {
  newFeatureModuleForm: FormGroup;
  statuss: Array<String> = ['Active', 'Inactive'];
  role: Array<Object> = [
    { 'id': 0, 'itemName': 'Buyer' },
    { 'id': 1, 'itemName': 'Supplier' },
    { 'id': 2, 'itemName': 'Agent' },
    { 'id': 3, 'itemName': 'Reseller' }];

  selectedRoles: any;
  settings: any;
  settings1: any;
  showMessage: any;
  constructor(
    public activeModal: NgbActiveModal,
    private featureService: FeatureService
  ) { }

  ngOnInit() {
    this.settings = {
      singleSelection: true,
      text: "Select Role",
      enableSearchFilter: true,
    };


    this.createForm();
  }

  createForm() {
    let feature = new FormArray([]);
    this.newFeatureModuleForm = new FormGroup({
      'name': new FormControl(null),
      'role': new FormControl(null),
      'status': new FormControl(null),
      'feature': feature
    })
  }

  addNewFeature() {
    const control = new FormGroup({
      'name': new FormControl(),
      'value': new FormControl()
    });
    (<FormArray>this.newFeatureModuleForm.get('feature')).push(control);
  }

  addNewFeatureModule() {
    this.featureService.addFeature(this.newFeatureModuleForm.value).subscribe((response: HttpResponse<any>) => {
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

      this.closeModal();
      this.showMessage = error.error['message']
      this.openUnscuccessSwal();
    })

  }

  onSelectValue(event) {

  }


  openSuccessSwal() {
    swal({
      title: 'Successful!',
      text: 'Feature module created successfully!',
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
    this.newFeatureModuleForm.reset();
    this.closeModal();
  }

  clearModal() {
    this.newFeatureModuleForm.reset();
  }

  onItemSelect(item: any) {
  }
  OnItemDeSelect(item: any) {
  }
  onSelectAll(items: any) {
  }
  onDeSelectAll(items: any) {
  }
}

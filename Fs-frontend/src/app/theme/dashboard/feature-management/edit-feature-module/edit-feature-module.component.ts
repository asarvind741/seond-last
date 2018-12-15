import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { FeatureService } from '../../../../services/feature.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-edit-feature',
  templateUrl: './edit-feature-module.component.html',
  styleUrls: ['./edit-feature-module.component.scss']
})
export class EditFeatureComponent implements OnInit {
  editFeatureModuleForm: FormGroup;
  statuss: Array<String> = ['Active', 'Inactive'];
  role: Array<Object> = [
    { 'id': 0, 'itemName': 'Buyer' },
    { 'id': 1, 'itemName': 'Supplier' },
    { 'id': 2, 'itemName': 'Agent' },
    { 'id': 3, 'itemName': 'Reseller' }];

    selectedRole: any = [];
  settings: any;
  @Input('currentFeature') currentFeature: any;
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
    let name = this.currentFeature.name ? this.currentFeature.name : '';
    let role = this.currentFeature.role ? this.currentFeature.role : '';
    let features = this.currentFeature.feature ? this.currentFeature.feature : '';
    let status = this.currentFeature.status ? this.currentFeature.status : '';

    if (features.length > 0) {
      features.forEach(feat => {
        feature.push(
          new FormGroup({
            'name': new FormControl(feat.name),
            'value': new FormControl(feat.value)
          })
        )
      })
    }

    let roleToInsert;

   this.role.forEach(rol => {
      if(rol['itemName'] === role){
        roleToInsert = rol;
      }
    })

    this.selectedRole.push(roleToInsert);

    this.editFeatureModuleForm = new FormGroup({
      'name': new FormControl(name),
      'role': new FormControl(roleToInsert),
      'status': new FormControl(status),
      'feature': feature
    })
  }

  addNewFeature() {
    const control = new FormGroup({
      'name': new FormControl(),
      'value': new FormControl()
    });
    (<FormArray>this.editFeatureModuleForm.get('feature')).push(control);
  }

  editFeatureModule() {
    this.featureService.updateFeature(this.currentFeature._id, this.editFeatureModuleForm.value).subscribe((response: HttpResponse<any>) => {
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
    this.editFeatureModuleForm.reset();
    this.closeModal();
  }

  clearModal() {
    this.editFeatureModuleForm.reset();
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

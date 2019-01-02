import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { PlanService } from '../../../../services/plan.service';
import { HttpResponse } from '@angular/common/http';
import { id } from '@swimlane/ngx-datatable/release/utils';
import { FeatureService } from '../../../../services/feature.service';

@Component({
  selector: 'app-add-coupon',
  templateUrl: './add-subscription.component.html',
  styleUrls: ['./add-subscription.component.scss']
})
export class AddSubscriptionComponent implements OnInit {
  newPlanForm: FormGroup;
  statuss: Array<String> = ['Active', 'Inactive'];
  featureModules: any = [];
  selectedFeature: any = [];
  duration: Array<String> = ['2 YEARS', '1 YEAR', 'Half Yearly', 'Quaterly', 'Monthly'];
  role: Array<Object> = [
    { 'id': 0, 'itemName': 'Buyer' },
    { 'id': 1, 'itemName': 'Supplier' }];

  supplierType: Array<Object> = [
    { 'id': 0, 'itemName': 'supplier' },
    { 'id': 1, 'itemName': 'stockist' },
    { 'id': 2, 'itemName': 'external resources' },
    { 'id': 3, 'itemName': 'wholeseller/reseller' },
    { 'id': 4, 'itemName': 'agent' },
    { 'id': 5, 'itemName': 'manufacturer' }];

  modulesToInclude: Array<Object> = [
    { 'id': 0, 'itemName': 'First Module' },
    { 'id': 1, 'itemName': 'Second Module' },
    { 'id': 2, 'itemName': 'Third Module' },
    { 'id': 3, 'itemName': 'Fourth Module' }];

  selectedModules: any;
  selectedRoles: any;
  selectedRoleType: any;
  settings: any;
  settings1: any;
  settings2: any;
  showMessage: any;
  isSupplier: Boolean = false;
  constructor(
    public activeModal: NgbActiveModal,
    private planService: PlanService,
    private featureService: FeatureService
  ) { }

  ngOnInit() {
    this.settings = {
      singleSelection: true,
      text: "Select Role",
      enableSearchFilter: true,

    };

    this.settings1 = {
      singleSelection: false,
      text: "Select Modules",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      badgeShowLimit: 3
    };
    this.settings2 = {
      singleSelection: true,
      text: "Select type",
      enableSearchFilter: true,
    };

    this.createForm();
  }

  createForm() {
    this.newPlanForm = new FormGroup({
      'name': new FormControl(null),
      'duration': new FormControl(null),
      'price': new FormControl(null),
      'status': new FormControl(null),
      'description': new FormControl(null),
      'rolesAllowed': new FormControl([]),
      'moduleIncluded': new FormControl([]),
      'features': new FormControl(null),
      'roleType': new FormControl([])
    })
  }

  addNewPlan() {
    const modulesArrary = this.newPlanForm.value.moduleIncluded;
    const mainRole = this.newPlanForm.value.rolesAllowed;
    const subRole = this.newPlanForm.value.roleType;
    if (modulesArrary.length > 0) {
      modulesArrary.forEach(module => {
        module.moduleName = module.itemName;
        delete module.itemName;
      });
    }

    if(mainRole.length > 0 ){
      if(subRole.length > 0 ){
        const element = { 'roleName': mainRole[0].itemName, 'roleType': subRole[0].itemName }
        this.newPlanForm.value.rolesAllowed = [];
        this.newPlanForm.value.roleType;
        this.newPlanForm.value.rolesAllowed.push(element);
        delete this.newPlanForm.value.roleType;

      }
      else {
        delete this.newPlanForm.value.roleType;
        const element = {'roleName': mainRole[0].itemName }
        this.newPlanForm.value.rolesAllowed = [];
        this.newPlanForm.value.rolesAllowed.push(element);
      }
    }

    let feature = this.newPlanForm.value.features;
    if(feature){
      let element = { '_id': feature[0].id, 'name': feature[0].itemName };
      this.newPlanForm.value.features = element;
    }

    this.planService.addPlan(this.newPlanForm.value).subscribe((response: HttpResponse<any>) => {
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
      text: 'Subscription created successfully!',
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
    this.newPlanForm.reset();
    this.closeModal();
  }

  clearModal() {
    this.newPlanForm.reset();
  }

  onItemSelect(item: any) {

  if(item.itemName === "Buyer" || item.itemName === "Supplier"){
    if(item.itemName === "Supplier"){
      this.isSupplier = true;
    }
    else { 
      this.isSupplier = false;
    }
    this.featureService.getFeatureListByRole(item.itemName)
    .subscribe((response: HttpResponse<any>) => {
      if(response.status === 200){
       response['data'].forEach(item => {
         let element = { 'id': item._id, 'itemName': item.name };
         this.featureModules.push(element);
       })
      }
    })

  }
  }
  OnItemDeSelect(item: any) {
    this.selectedRoles = undefined;
  }
  onSelectAll(items: any) {
  }
  onDeSelectAll(items: any) {
  }
}

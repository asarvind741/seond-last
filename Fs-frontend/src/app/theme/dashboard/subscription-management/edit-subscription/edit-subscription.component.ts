import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { PlanService } from '../../../../services/plan.service';
import { FeatureService } from '../../../../services/feature.service';

@Component({
  selector: 'app-subscription-plan',
  templateUrl: './edit-subscription.component.html',
  styleUrls: ['./edit-subscription.component.scss']
})
export class EditSubscriptionComponent implements OnInit {
  editPlanForm: FormGroup;
  featureModules: any = [];
  statuss: Array<String> = ['Active', 'Inactive'];
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
  selectedModules: any = [];
  selectedRoles: any = [];
  selectedRoleType: any = [];
  settings1: any;
  settings2: any;
  settings3: any;
  settings: any;
  isSupplier: Boolean = false;
  showMessage: any;
  selectedFeature: any = [];

  @Input() currentPlan;
  constructor(
    public activeModal: NgbActiveModal,
    private planService: PlanService,
    private featureService: FeatureService
  ) { }

  ngOnInit() {
    this.settings = {
      singleSelection: true,
      text: "Select Roles",
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
      text: "Select supplier type",
      enableSearchFilter: true,
    };
    this.settings3 = {
      singleSelection: true,
      text: "Select Feature Module",
      enableSearchFilter: true,
    };
    this.createForm();
  }

  createForm() {
    let name = this.currentPlan.name ? this.currentPlan.name : '';
    let duration = this.currentPlan.duration ? this.currentPlan.duration : 'Select One';
    let price = this.currentPlan.price ? this.currentPlan.price : '';
    let description = this.currentPlan.description ? this.currentPlan.description : '';
    let status = this.currentPlan.status ? this.currentPlan.status : null;
    let rolesAllowed = this.currentPlan.rolesAllowed ? this.currentPlan.rolesAllowed : null;
    let moduleIncluded = this.currentPlan.moduleIncluded ? this.currentPlan.moduleIncluded : null;
    let feature = this.currentPlan.features ? this.currentPlan.features : null;
 
    if (rolesAllowed.length > 0) {
      this.featureService.getFeatureListByRole(rolesAllowed[0].roleName)
        .subscribe((response: HttpResponse<any>) => {
          if (response.status === 200) {
           response['data'].forEach(item => {
             let element = { 'id': item._id, 'itemName': item.name};
             this.featureModules.push(element)
           })
          }
        })
    }
    if (rolesAllowed.length > 0) {
      let element;
      let element1;
      if (rolesAllowed[0].roleName === "Supplier") {
        this.isSupplier = true;
        element = { 'id': 0, 'itemName': rolesAllowed[0].roleName };

        if(rolesAllowed[0].roleType === "supplier"){
          element1 = { 'id': 0, 'itemName': rolesAllowed[0].roleType }
        }
        else if(rolesAllowed[0].roleType === "stockist"){
          element1 = { 'id': 1, 'itemName': rolesAllowed[0].roleType }
        }
        else if(rolesAllowed[0].roleType === "external resources"){
          element1 = { 'id': 2, 'itemName': rolesAllowed[0].roleType }
        }
        else if(rolesAllowed[0].roleType === "wholeseller/reseller"){
          element1 = { 'id': 3, 'itemName': rolesAllowed.roleType }
        }
        else if(rolesAllowed[0].roleType === "agent"){
          element1 = { 'id': 4, 'itemName': rolesAllowed[0].roleType }
        }
        else if(rolesAllowed[0].roleType === "manufacturer"){
          element1 = { 'id': 5, 'itemName': rolesAllowed[0].roleType }
        }
        this.selectedRoles.push(element);
        this.selectedRoleType.push(element1);
      }
      else {
        element = { 'id': 0, 'itemName': rolesAllowed.roleName };
        this.selectedRoles.push(element);
      }
    }

    if (moduleIncluded) {
      moduleIncluded.forEach((mod, i) => {
        let element = { id: i, itemName: mod.moduleName };
        this.selectedModules.push(element);
      })
    }

    if(feature){
      let element =  { id: feature._id, itemName: feature.name };
      this.selectedFeature.push(element);
    }
    this.editPlanForm = new FormGroup({
      'name': new FormControl(name),
      'duration': new FormControl(duration),
      'price': new FormControl(price),
      'description': new FormControl(description),
      'status': new FormControl(status),
      'rolesAllowed': new FormControl(rolesAllowed[0].roleName),
      'moduleIncluded': new FormControl(moduleIncluded),
      'features': new FormControl(this.selectedFeature[0]),
      'roleType': new FormControl(rolesAllowed[0].roleType)
    })
  }

  editPlan() {

    const modulesArrary = this.editPlanForm.value.moduleIncluded;
    const mainRole = this.editPlanForm.value.rolesAllowed;
    const subRole = this.editPlanForm.value.roleType;
    if (modulesArrary.length > 0) {
      modulesArrary.forEach(module => {
        module.moduleName = module.itemName;
        delete module.itemName;
      });
    }
    if(mainRole.length > 0 ){
      if(subRole.length > 0 ){
        const element = { 'roleName': mainRole[0].itemName, 'roleType': subRole[0].itemName }
        this.editPlanForm.value.rolesAllowed = [];
        this.editPlanForm.value.rolesAllowed.push(element);
        this.editPlanForm.value.roleType;
        delete this.editPlanForm.value.roleType;
      }
      else {
        delete this.editPlanForm.value.roleType;
        const element = {'roleName': mainRole[0].itemName }
        this.editPlanForm.value.rolesAllowed = element;
       
      }
    }
    let feature = this.editPlanForm.value.features;
    if(feature){
      let element = { '_id': feature[0].id, 'name': feature[0].itemName };
      this.editPlanForm.value.features = element;
    }

    this.planService.updatePlan(this.currentPlan._id, this.editPlanForm.value)
      .subscribe((response: HttpResponse<any>) => {
        if (response.status === 200) {
          this.closeModal();
          this.openSuccessSwal();
        }
      }, (error) => {
        this.closeModal();
        this.showMessage = error.error['message']
        this.openUnscuccessSwal();
      })

  }

  openSuccessSwal() {
    swal({
      title: 'Successful!',
      text: 'Plan updated successfully!',
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
    this.editPlanForm.reset();
    this.closeModal();
  }

  clearModal() {
    this.editPlanForm.reset();
  }

  onItemSelect(item: any) {
    if (item.itemName === "Buyer" || item.itemName === "Supplier" || item.itemName === "Agent" || item.itemName === "Reseller") {
      this.featureService.getFeatureListByRole(item.itemName)
        .subscribe((response: HttpResponse<any>) => {
          if (response.status === 200) {
            this.featureModules = response['data'];
          }
        })
    }
  }
  OnItemDeSelect(item: any) {
  }
  onSelectAll(items: any) {
  }
  onDeSelectAll(items: any) {
  }

}

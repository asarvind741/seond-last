import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import {PlanService } from '../../../../services/plan.service';
import { FeatureService } from '../../../../services/feature.service';

@Component({
  selector: 'app-subscription-plan',
  templateUrl: './edit-subscription.component.html',
  styleUrls: ['./edit-subscription.component.scss']
})
export class EditSubscriptionComponent implements OnInit {
  editPlanForm: FormGroup;
  showMessage: any;
  featureModules: any;
  statuss: Array<String> = ['Active', 'Inactive'];
  duration: Array<String> = ['Yearly', 'Half Yearly', 'Quarterly', 'Monthly'];
  role: Array<Object> = [
    {'id': 0, 'itemName': 'Buyer' }, 
    {'id': 1, 'itemName': 'Supplier' }, 
    {'id': 2, 'itemName': 'Agent' }, 
    {'id': 3, 'itemName': 'Reseller' }];
    modulesToInclude: Array<Object> = [
      {'id': 0, 'itemName': 'First Module' }, 
      {'id': 1, 'itemName': 'Second Module' }, 
      {'id': 2, 'itemName': 'Third Module' }, 
      {'id': 3, 'itemName': 'Fourth Module' }];
      selectedModules: any = [];
      selectedRoles: any = [];
      settings1: any;
      settings: any;

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
    this.createForm();
  }

  createForm(){
    let name = this.currentPlan.name ? this.currentPlan.name : '';
    let duration = this.currentPlan.duration ? this.currentPlan.duration : 'Select One';
    let price = this.currentPlan.price ? this.currentPlan.price : '';
    let description = this.currentPlan.description ? this.currentPlan.description: '';
    let status = this.currentPlan.status ? this.currentPlan.status : null;
    let maxNumberOfMembers = this.currentPlan.maxNumberOfMembers ? this.currentPlan.maxNumberOfMembers : null;
    let rolesAllowed = this.currentPlan.rolesAllowed ? this.currentPlan.rolesAllowed : null;
    let moduleIncluded = this.currentPlan.moduleIncluded ? this.currentPlan.moduleIncluded : null;
    
    // let features = new FormArray([]);

    // if(this.currentPlan.features){
    //   this.currentPlan.features.forEach((feature: String) => {
    //     features.push(new FormControl(feature))
    //   })
    // }

    let feature = this.currentPlan.features ? this.currentPlan.features : null;
    console.log("sssssssssss", feature);
    let features = new FormControl(feature)


    if(rolesAllowed.length > 0){
      this.featureService.getFeatureListByRole(rolesAllowed[0].roleName)
      .subscribe((response: HttpResponse<any>) => {
        if(response.status === 200){
          this.featureModules = response['data'];
        }
      })
    }


    if(rolesAllowed){
      rolesAllowed.forEach((role, i) => {
        let element = { 'id': i, 'itemName': role.roleName };
        this.selectedRoles.push(element);
        console.log("this selected", this.selectedRoles);
      })
    }
    if(moduleIncluded){
      moduleIncluded.forEach((mod, i) => {
        let element = { 'id': i, 'itemName': mod.moduleName };
        this.selectedModules.push(element);
        console.log("this selected", this.selectedModules);
      })
    }
    
    this.editPlanForm = new FormGroup({
      'name': new FormControl(name),
      'duration': new FormControl(duration),
      'price': new FormControl(price),
      'description': new FormControl(description),
      'status': new FormControl(status),
      'rolesAllowed': new FormControl(rolesAllowed),
      'moduleIncluded': new FormControl(moduleIncluded),
      'features': features
    })
  }

  addNewFeature(){
    const control = new FormControl('');
    (<FormArray>this.editPlanForm.get('features')).push(control);
  }

  editPlan(){

    const modulesArrary = this.editPlanForm.value.moduleIncluded;
    const rolesArray = this.editPlanForm.value.rolesAllowed;
    if (modulesArrary.length > 0) {
      modulesArrary.forEach(module => {
        module.moduleName = module.itemName;
        delete module.itemName;
      });
    }

    if (rolesArray.length > 0) {
      rolesArray.forEach(role => {
        role.roleName = role.itemName;
        delete role.itemName;
      });
    }

    this.planService.updatePlan(this.currentPlan._id, this.editPlanForm.value)
    .subscribe((response: HttpResponse<any>) => {
      if(response.status === 200){
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

  cancelNewUserAddition(){
    this.editPlanForm.reset();
    this.closeModal();
  }

  clearModal(){
    this.editPlanForm.reset();
  }

  onItemSelect(item: any) {
    if(item.itemName === "Buyer" || item.itemName === "Supplier" || item.itemName === "Agent" || item.itemName === "Reseller"){
      this.featureService.getFeatureListByRole(item.itemName)
      .subscribe((response: HttpResponse<any>) => {
        if(response.status === 200){
          this.featureModules = response['data'];
          console.log("featuere module", this.featureModules)
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

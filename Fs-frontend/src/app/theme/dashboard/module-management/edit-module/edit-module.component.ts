import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';
import { FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { ModuleService } from '../../../../services/module.service';
import { FileHolder } from 'angular2-image-upload';
import * as moment from 'moment';

@Component({
  selector: 'app-edit-module',
  templateUrl: './edit-module.component.html',
  styleUrls: ['./edit-module.component.scss']
})
export class EditModuleComponent implements OnInit {
  editMuleForm: FormGroup;
  showMessage: any;
  statuss: Array<String> = ['Active', 'Inactive'];
  images: any = [];
  selectedCategories: any = [];
  selectedFilterVal: any = [];
  allCategories: any = [];
  settings2:any;
  @Input() currentModule;
  constructor(
    public activeModal: NgbActiveModal,
    private moduleService: ModuleService
    ) { }

  ngOnInit() {

    this.settings2 = {
      singleSelection: false,
      text: "Select Category",
      enableSearchFilter: true
    };

    this.moduleService.getCategory()
      .subscribe((response: HttpResponse<any>) => {
        if (response.status === 200) {
          response['data'].forEach(cat => {
            let element = { 'id': cat._id, 'itemName': cat.name };
            this.allCategories.push(element);
          })
        }
      })
    
    this.createForm();
  }

  createForm(){
    let name = this.currentModule.name ? this.currentModule.name : '';
    let status = this.currentModule.status ? this.currentModule.status : null;
    let description = this.currentModule.description ? this.currentModule.description: '';
    let categories = this.currentModule.categories ? this.currentModule.categories : '';

    if (categories) {
      categories.forEach(element => {
        let item = { 'id': element.id, 'itemName': element.name };
      this.selectedCategories.push(item);
      });
    }

    let images = [];

    if (this.currentModule.images.length > 0) {
      let images = [];
      this.currentModule.images.forEach(image => {
        images.push(image);
      });
      this.images = images;
    }

    this.editMuleForm = new FormGroup({
      'name': new FormControl(name),
      'description': new FormControl(description),
      'categories': new FormControl(categories),
      'images': new FormControl(images),
      'status': new FormControl(status)
    })
  }

  editModule(){
    this.images.forEach(element => {
      this.editMuleForm.value.images.push(element)
    });
    let data = this.editMuleForm.value;
    data.categories.forEach(element => {
      element.name = element.itemName;
      delete element.itemName
    });
    this.moduleService.updateModule(this.currentModule._id, data)
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
      text: 'Module updated successfully!',
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
    this.editMuleForm.reset();
    this.closeModal();
  }

  clearModal(){
    this.editMuleForm.reset();
  }

  onRemoved(file: FileHolder) {

  }

  onUploadStateChanged(state: boolean) {

  }

  onUploadFinished(file: FileHolder) {
    this.images.push(file.serverResponse.response['_body']);
  }

  OnItemDeSelect(item: any) {

  }
  onSelectAll(items: any) {

  }

  onDeSelectAll(items: any) {
    this.selectedFilterVal = []
  }

  onItemSelectCat(item: any) {

  }

}

import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';
import { FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
import { ModuleService } from '../../../../services/module.service';
import { HttpResponse } from '@angular/common/http';
import { FileHolder } from 'angular2-image-upload';

@Component({
  selector: 'app-add-module',
  templateUrl: './add-module.component.html',
  styleUrls: ['./add-module.component.scss']
})
export class AddModuleComponent implements OnInit {
  newModuleForm: FormGroup;
  categories: any;
  statuss: Array<String> = ['Active', 'Inactive'];
  showMessage: any;
  images: any = [];
  selectedFilterVal: any = [];
  selectedCategories: any = [];
  allCategories: any = [];
  settings2: any;
  constructor(
    public activeModal: NgbActiveModal,
    private moduleService: ModuleService
  ) { }

  ngOnInit() {
    this.createForm();
    this.getCategories();

    this.settings2 = {
      singleSelection: true,
      text: "Select Category",
      enableSearchFilter: true
    };
  }

  createForm() {
    let images = new FormArray([]);
    this.newModuleForm = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'description': new FormControl(null),
      'categories': new FormControl([], [ Validators.required ]),
      'images': images,
      'status': new FormControl(null)
    })
  }

  getCategories(){
    this.moduleService.getCategory().subscribe((response: HttpResponse<any>) => {
      if (response.status === 200) {
        this.categories = response['data']
      }
    })
  }

  addNewModule() {
    this.images.forEach(element => {
      this.newModuleForm.value.images.push(element)
    });
    this.newModuleForm.value.categories = [this.categories]
    console.log("------------------>>>>>>>>>>", this.newModuleForm.value)
    // this.moduleService.addModule(this.newModuleForm.value).subscribe((response: HttpResponse<any>) => {
    //     if (response.status === 200) {
    //       this.closeModal();
    //       this.openSuccessSwal();
    //     }
    //     else if (response.status !== 200) {
    //       this.closeModal();
    //       this.showMessage = response['date'];
    //       this.openUnscuccessSwal();
    //     }
    //   }, (error) => {
    //     console.log(error);
    //     this.closeModal();
    //     this.showMessage = error.error['message']
    //     this.openUnscuccessSwal();
    //   })
  }

  onSelectValue(event) {
    console.log("value", this.newModuleForm.value)
  }


  openSuccessSwal() {
    swal({
      title: 'Successful!',
      text: 'Coupon created successfully!',
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

  clearModal() {
    this.newModuleForm.reset();
  }

  onRemoved(file: FileHolder) {

  }

  onUploadStateChanged(state: boolean) {

  }

  onUploadFinished(file: FileHolder) {
    this.images.push(file.serverResponse.response['_body']);
    console.log("--------------------->>",this.images)
  }

  OnItemDeSelect(item: any) {

  }
  onSelectAll(items: any) {

  }

  onDeSelectAll(items: any) {
    this.selectedFilterVal = []
  }

  // onItemSelectCat(item: any) {
  //   this.allCategoryFilters = [];
  //   this.filterService.getSelectedCategoryFilters(item.id)
  //     .subscribe((response: HttpResponse<any>) => {
  //       this.categoryList = response['data'];
  //       this.categoryList.forEach(category => {
  //         this.allCategoryFilters.push(category.name);
  //         category.value.forEach((val, i) => {
  //           let element = { 'id': i, 'itemName': val }
  //           this.allFilterValues.push(element);
  //         })

  //       })
  //     })
  // }
}

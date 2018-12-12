import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';
import { FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { CategoryService } from '../../../../services/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  newCategoryForm: FormGroup;
  allCategoryFilters: any = [];
  settings:any;
  selectedCategories: any;
  statuss: Array<String> = ['Active', 'Inactive'];
  showMessage: any;
  constructor(
    public activeModal: NgbActiveModal,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {

    this.categoryService.getCategoryFilterList()
    .subscribe((response:HttpResponse<any>) => {
      if(response.status === 200){
        response['data'].forEach(filter => {
          let element = { 'id': filter._id, 'itemName': filter.name}
          this.allCategoryFilters.push(element);
        })
      }
    })

    this.settings = {
      singleSelection: false,
      text: "Select Filters",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      badgeShowLimit: 3
    };

    this.createForm();
  }

  createForm() {
    let filter = new FormArray([]);

    this.newCategoryForm = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'description': new FormControl(null, [ Validators.required ]),
      'status': new FormControl(null, [Validators.required]),
      'filter': new FormControl([])
    })
  }

  addNewCategory() {
    let filters = this.newCategoryForm.value.filter;
    let arrayFilter = [];
    filters.forEach(filter => {
      let element = { 'id': filter.id, 'name': filter.itemName};
      arrayFilter.push(element);
    })
    this.newCategoryForm.get('filter').setValue(arrayFilter);
    this.categoryService.addCateogory(this.newCategoryForm.value).subscribe((response: HttpResponse<any>) => {
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

  addNewValue(){
    const control = new FormControl(null);
    (<FormArray>this.newCategoryForm.get('filter')).push(control);
  }

  onSelectValue(event) {
  }


  openSuccessSwal() {
    swal({
      title: 'Successful!',
      text: 'Category created successfully!',
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
    this.newCategoryForm.reset();
    this.closeModal();
  }

  clearModal() {
    this.newCategoryForm.reset();
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

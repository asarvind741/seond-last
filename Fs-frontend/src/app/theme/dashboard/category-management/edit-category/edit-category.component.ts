import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';
import { FormArray, FormGroup, FormControl } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { CategoryService } from '../../../../services/category.service';

@Component({
  selector: 'app-edit-cateogory',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {
  editCategoryForm: FormGroup;
  @Input('currentCategory') currentCategory;
  allCategoryFilters: any = [];
  settings:any;
  selectedCategories: any = [];
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
    let name = this.currentCategory.name ? this.currentCategory.name : null;
    let description = this.currentCategory.description ? this.currentCategory.description : null;
    let status = this.currentCategory.status ? this.currentCategory.status : null;
    let filter = this.currentCategory.filter ? this.currentCategory.filter : null;

    if(this.currentCategory.filter.length > 0){
      this.currentCategory.filter.forEach((filtr) => {
       
        let element = { 'id': filtr.id, 'itemName': filtr.name };
        this.selectedCategories.push(element);
      })
    }
   


    this.editCategoryForm = new FormGroup({
      'name': new FormControl(name),
      'description': new FormControl(description),
      'status': new FormControl(status),
      'filter': new FormControl(filter)
    })
  }

  editCategory() {
    this.categoryService.updateCategory(this.currentCategory._id, this.editCategoryForm.value).subscribe((response: HttpResponse<any>) => {
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

  addNewValue() {
    const control = new FormControl(null);
    (<FormArray>this.editCategoryForm.get('value')).push(control);
  }

  onSelectValue(event) {
  }


  openSuccessSwal() {
    swal({
      title: 'Successful!',
      text: 'Category updated successfully!',
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
    this.editCategoryForm.reset();
    this.closeModal();
  }

  clearModal() {
    this.editCategoryForm.reset();
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

import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { AddCategoryComponent } from './add-category/add-category.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import * as moment from 'moment';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: '<app-cateogory-management></app-cateogory-management>',
  templateUrl: './category-management.component.html',
  styleUrls: [
    './category-management.component.scss',
    '../../../../assets/icon/icofont/css/icofont.scss'
  ]
})
export class CategoryManagementComponent implements OnInit {
  deleting: Boolean;
  showMessage: any;
  constructor(
    private categoryService: CategoryService,
    private modalService: NgbModal
  ) {
  }
  search_input: string = null;
  editing = {};
  rows = [];
  temp_rows = [];
  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getCategories()
      .subscribe((response: HttpResponse<any>) => {
        if (response.status === 200) {
          this.rows = response['data'];
          this.temp_rows = response['data'];
        }
        else {
          this.openUnscuccessSwal();
        }
      }, (error: HttpErrorResponse) => {
        this.openUnscuccessSwal();
      })
  }

  onSearchInputChange(val) {
    if (val) {
      val = val.toLowerCase();
      let data = this.temp_rows;
      data = data.filter(category => {
        let tempFilters = '';
        category.filter.forEach(cat => {
          tempFilters+=cat.name;
        })
        if (
          category.name && category.name.toLowerCase().indexOf(val) >= 0 ? true : false ||
          category.description && category.description.toLowerCase().indexOf(val) >= 0 ? true : false ||
          category.status && category.status.toLowerCase().indexOf(val) >= 0 ? true : false ||
          tempFilters && tempFilters.toLowerCase().indexOf(val) >= 0 ? true : false ||
          category.createdBy && category.createdBy.name && category.createdBy.name.toLowerCase().indexOf(val) >= 0 ? true : false ||
          category.createdAt && moment(category.createdAt).format("MMM DD, YYYY").toLowerCase().indexOf(val) >= 0 ? true : false
        )
          return true;
      });
      this.rows = data;
    } else this.rows = this.temp_rows;
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

  activateFilter(name) {

    swal({
      title: 'Are you sure?',
      text: 'You not be able to revert this!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, activate it!',
      cancelButtonText: 'Not now!',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger mr-sm'
    }).then((result) => {
      if (result.value) {
        this.categoryService.modifyStatus(name._id).subscribe((response: HttpResponse<any>) => {
          if (response.status === 200) {
            this.getCategories();
            swal(
              'Success!',
              'Your have activated category successfully.',
              'success'
            );
          }
        });

      } else if (result.dismiss) {
        swal(
          'Cancelled',
          'You have cancelled activation request.',
          'error'
        );
      }
    });
  }

  deactivateFilter(name) {
    this.deleting = true;
    swal({
      title: 'Are you sure?',
      text: 'You not be able to revert this!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, deactivate it!',
      cancelButtonText: 'Not now!',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger mr-sm'
    }).then((result) => {
      if (result.value) {
        this.categoryService.modifyStatus(name._id).subscribe((response: HttpResponse<any>) => {
          if (response.status === 200) {
            this.getCategories();
            swal(
              'Deactivated!',
              'Your have deactivated category successfully.',
              'success'
            );
          }
        });

      } else if (result.dismiss) {
        swal(
          'Cancelled',
          'You have cancelled deactivation request.)',
          'error'
        );
      }
    });
    this.deleting = false;

  }

  openFormModal() {
    const modalRef = this.modalService.open(AddCategoryComponent);
    modalRef.result.then((result) => {
      this.getCategories();
    }).catch((error) => {
      this.getCategories();
    });
  }

  openEditFormModal(category) {
    const modalRef = this.modalService.open(EditCategoryComponent);
    modalRef.componentInstance.currentCategory = category;
    modalRef.result.then((result) => {
      this.getCategories();
    })
      .catch((error) => {
        this.getCategories();
      });
  }

  deleteFilter(filter) {
    swal({
      title: 'Are you sure to delete category?',
      text: 'You not be able to revert this!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Not now!',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger mr-sm'
    }).then((result) => {
      if (result.value) {
        this.categoryService.deleteCateogory(filter._id).subscribe((response: HttpResponse<any>) => {
          if (response.status === 200) {
            this.getCategories();
            swal(
              'Success!',
              'Your have deleted category successfully.',
              'success'
            );
          }
        });

      } else if (result.dismiss) {
        swal(
          'Cancelled',
          'You have cancelled deletion request.)',
          'error'
        );
      }
    });
  }
}

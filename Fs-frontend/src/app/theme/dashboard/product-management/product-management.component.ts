import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddProductComponent } from './add-product/add-product.component';
import { HttpResponse } from '@angular/common/http';
import { EditProductComponent } from './edit-product/edit-product.component';
import { ProductService } from '../../../services/product.service';
import { CategoryService } from '../../../services/category.service';
import { ModuleService } from '../../../services/module.service';

@Component({
  selector: '<app-product-management></app-product-management>',
  templateUrl: './product-management.component.html',
  styleUrls: [
    './product-management.component.scss',
    '../../../../assets/icon/icofont/css/icofont.scss'
  ]
})
export class ProductManagementComponent implements OnInit {
  deleting: Boolean;
  showMessage: any;

  constructor(
    private productService: ProductService,
    private modalService: NgbModal
  ) {
    this.getProducts();
  }
  search_input: string = null;
  editing = {};
  rows = [];
  temp_rows = [];
  ngOnInit() {
  
  }

  getProducts() {
    this.productService.getProducts()
      .subscribe((response: HttpResponse<any>) => {
        console.log("products", response);
        this.rows = response['data'];
        this.temp_rows = response['data'];
      })
  }

  updateValue(event, cell, row) {
    this.editing[row + '-' + cell] = false;
    this.temp_rows[row][cell] = event.target.value;
    this.rows = this.temp_rows;
    this.productService.updateProduct(this.rows[row]._id, this.rows[row])
      .subscribe((response: HttpResponse<any>) => {
        if (response.status === 200) {
          this.getProducts();
          this.openSuccessSwal();
        }
      }, (error) => {
        this.showMessage = error.error['message'];
        this.getProducts();
        this.openUnscuccessSwal()
      })
  }

  onSearchInputChange(val) {
    if (val) {
      val = val.toLowerCase();
      let data = this.temp_rows;
      data = data.filter(user => {
        if (
          user.firstName && user.firstName.toLowerCase().indexOf(val) >= 0 ? true : false ||
            user.lastName && user.lastName.toLowerCase().indexOf(val) >= 0 ? true : false ||
              user.email && user.email.toLowerCase().indexOf(val) >= 0 ? true : false ||
                user.status && user.status.toLowerCase().indexOf(val) >= 0 ? true : false ||
                  user.role && user.role.toLowerCase().indexOf(val) >= 0 ? true : false
        )
          return true;
      });
      this.rows = data;
    } else {
      this.rows = this.temp_rows;
    }
  }

  openSuccessSwal() {
    swal({
      title: 'Successful!',
      text: 'Product updated successfully!',
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

  openSuccessCancelSwal(name) {
    this.deleting = true;
    swal({
      title: 'Are you sure?',
      text: 'You not be able to revert this!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger mr-sm'
    }).then((result) => {
      if (result.value) {
        this.productService.modifyStatus(name._id).subscribe((response: HttpResponse<any>) => {
          if (response.status === 200) {
            this.getProducts();
            swal(
              'Deleted!',
              'Your have delete product successfully.',
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

  openFormModal() {
    const modalRef = this.modalService.open(AddProductComponent);
    modalRef.result.then((result) => {
      this.getProducts();
    }).catch((error) => {
      this.getProducts();
    });
  }

  openEditFormModal(user) {
    const modalRef = this.modalService.open(EditProductComponent);
    modalRef.componentInstance.currentUser = user;
    modalRef.result.then((result) => {
      this.getProducts();
    })
      .catch((error) => {
        this.getProducts();
      });
  }

  activateUser(name) {
    console.log("name", name)
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
        this.productService.modifyStatus(name._id).subscribe((response: HttpResponse<any>) => {
          console.log(response)
          if (response.status === 200) {
            this.getProducts();
            swal(
              'Success!',
              'Your have activated product successfully.',
              'success'
            );
          }
        });

      } else if (result.dismiss) {
        swal(
          'Cancelled',
          'You have cancelled activation request.)',
          'error'
        );
      }
    });
  }

  deleteUser(user) {
    swal({
      title: 'Are you sure to delete product?',
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
        this.productService.deleteProduct(user._id).subscribe((response: HttpResponse<any>) => {
          console.log(response)
          if (response.status === 200) {
            this.getProducts();
            swal(
              'Success!',
              'Your have deleted product successfully.',
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

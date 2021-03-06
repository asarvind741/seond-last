import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { AddProductComponent } from './add-product/add-product.component';
import { HttpResponse } from '@angular/common/http';
import { EditProductComponent } from './edit-product/edit-product.component';
import { ProductService } from '../../../services/product.service';
import { FilterService } from '../../../services/filter.service';
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
  csvData: any;

  options = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: true,
    headers: ['name', 'price', 'category', 'minOrder','regions', 'createdBy', 'createdAt', 'status'],
    showTitle: true,
    title: 'product_data',
    useBom: false,
    removeNewLines: true,
    keys: ['name', 'price', 'category', 'minOrder','regions', 'createdBy', 'createdAt', 'status']
  };
  constructor(
    private productService: ProductService,
    private filterService: FilterService,
    private modalService: NgbModal
  ) {
   
  }
  search_input: string = null;
  editing = {};
  productFilterList: any = [];
  rows = [];
  temp_rows = [];
  ngOnInit() {
    this.getProducts();
    this.getPrdocutFilterList();
    this.exportData();
  }

  getPrdocutFilterList(){
    this.filterService.getFilters()
    .subscribe((response: HttpResponse<any>) => {
      if(response.status === 200 ){
        
      }
    })
  }

  getProducts() {
    this.productService.getProducts()
      .subscribe((response: HttpResponse<any>) => {
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
      data = data.filter(product => {
        let regionString = '';
        product.regions.forEach(reg => {
          regionString = regionString + reg.name;
        })
        if (
          product.name && product.name.toLowerCase().indexOf(val) >= 0 ? true : false ||
          product.category && product.category.name.toLowerCase().indexOf(val) >= 0 ? true : false ||
          product.price && product.price.toString().indexOf(val) >= 0 ? true : false ||
          product.status && product.status.toLowerCase().indexOf(val) >= 0 ? true : false ||
          regionString && regionString.toLowerCase().indexOf(val) >= 0 ? true : false ||
          product.createdAt && moment(product.createdAt).format("MMM DD, YYYY").toLowerCase().indexOf(val) >= 0 ? true : false
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
      confirmButtonText: 'Yes, deactivate it!',
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
              'Your have deactivated product successfully.',
              'success'
            );
          }
        });

      } else if (result.dismiss) {
        swal(
          'Cancelled',
          'You have cancelled deactviated request.)',
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

  openEditFormModal(product) {
    const modalRef = this.modalService.open(EditProductComponent);
    modalRef.componentInstance.currentProduct = product;
    modalRef.result.then((result) => {
      this.getProducts();
    })
      .catch((error) => {
        this.getProducts();
      });
  }

  activateProduct(name) {
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

  deleteProduct(product) {
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
        this.productService.deleteProduct(product._id).subscribe((response: HttpResponse<any>) => {
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

  exportData() {
    this.productService.getProducts()
      .subscribe((response: HttpResponse<any>) => {
        console.log("-------------------->>>>>>>>>>>", JSON.stringify(response))
        this.csvData = response['data'];
        let data = []
        this.csvData.forEach(element => {
          let user = {name:"", price:"", category:"", minOrder:"", regions:"",createdBy:"", createdAt:"", status:""}
          user.name = element.name;
          user.price = element.price;
          user.category = element.category.name;
          user.minOrder = element.minOrder;
          element.regions.forEach(elements => {
            user.regions += elements.name + "/";
          });
          user.status = element.status;
          if( element.createdBy) user.createdBy = element.createdBy.name || "";
          user.createdAt = element.createdAt
          user.status = element.status
          data.push(user);
        });
        this.csvData = data
        console.log("Yo-------------------->>>>>>>>>>>", JSON.stringify(this.csvData))
      })
  }
}

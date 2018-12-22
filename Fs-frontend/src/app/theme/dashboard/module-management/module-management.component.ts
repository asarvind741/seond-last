import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CouponService } from '../../../services/coupon.service';
import { ModuleService } from '../../../services/module.service'
import { HttpResponse } from '@angular/common/http';
import { AddModuleComponent } from './add-module/add-module.component';
import { EditModuleComponent } from './edit-module/edit-module.component';
import * as moment from 'moment';

@Component({
  selector: '<app-module-management></app-module-management>',
  templateUrl: './module-management.component.html',
  styleUrls: [
    './module-management.component.scss',
    '../../../../assets/icon/icofont/css/icofont.scss'
  ]
})
export class ModuleManagementComponent implements OnInit {
  deleting: Boolean;
  showMessage: any;
  csvData: any;

  options = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: true,
    headers: ['Name', 'Categories', 'Description', 'Status'],
    showTitle: true,
    title: 'modules_data',
    useBom: false,
    removeNewLines: true,
    keys: ['name', 'categories', 'description', 'status']
  };

  constructor(
    private couponService: CouponService,
    private moduleService: ModuleService,
    private modalService: NgbModal
  ) {
    this.getModules();
    this.exportData();
  }
  search_input: string = null;
  editing = {};
  rows = [];
  temp_rows = [];
  ngOnInit() {
  }

  getModules() {
    this.moduleService.getModules()
      .subscribe(modules => {
        this.rows = modules['data'];
        this.temp_rows = modules['data'];
        //this.exportData(modules);
      })
  }

  onSearchInputChange(val) {
    if (val) {
      val = val.toLowerCase();
      let data = this.temp_rows;
      data = data.filter(modules => {
        if (
          modules.name && modules.name.toLowerCase().indexOf(val) >= 0 ? true : false ||
            modules.description && modules.description.toLowerCase().indexOf(val) >= 0 ? true : false ||
              modules.status && modules.status.toLowerCase().indexOf(val) >= 0 ? true : false
        )
          return true;
      });
      this.rows = data;
    } else this.rows = this.temp_rows;
  }

  openSuccessSwal() {
    swal({
      title: 'Successful!',
      text: 'module updated successfully!',
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

  activateModule(name) {
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
        this.moduleService.modifyStatus(name._id).subscribe((response: HttpResponse<any>) => {
          if (response.status === 200) {
            this.getModules();
            swal(
              'Success!',
              'Your have activated module successfully.',
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
      cancelButtonText: 'Not now!',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger mr-sm'
    }).then((result) => {
      if (result.value) {
        this.moduleService.modifyStatus(name._id).subscribe((response: HttpResponse<any>) => {
          if (response.status === 200) {
            this.getModules();
            swal(
              'Deleted!',
              'Your have deactivated module successfully.',
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
    const modalRef = this.modalService.open(AddModuleComponent);
    modalRef.result.then((result) => {
      this.getModules();
    }).catch((error) => {
      this.getModules();
    });
  }

  openEditFormModal(modules) {
    const modalRef = this.modalService.open(EditModuleComponent);
    modalRef.componentInstance.currentModule = modules;
    modalRef.result.then((result) => {
      this.getModules();
    })
      .catch((error) => {
        this.getModules();
      });
  }

  deleteModule(modules) {
    swal({
      title: 'Are you sure to delete module?',
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
        this.moduleService.deleteModule(modules._id).subscribe((response: HttpResponse<any>) => {
          if (response.status === 200) {
            this.getModules();
            swal(
              'Success!',
              'Your have deleted module successfully.',
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
    this.moduleService.getModules()
      .subscribe(modules => {
        console.log("-------------------->>>>>>>>>>>", JSON.stringify(modules))
        this.csvData = modules['data'];
        let categories = ""
        this.csvData.forEach(element => {
          delete element.createdBy
          delete element.updatedAt
          delete element.createdAt
          delete element._id
          delete element.__v
          delete element.images
          element.categories.forEach(elements => {
            delete elements._id
            delete elements._id
            categories += elements.name + "/";
          });
          delete element.categories;
          element.categories = categories
        });
        console.log("Yo-------------------->>>>>>>>>>>", JSON.stringify(this.csvData))
      })
  }
}

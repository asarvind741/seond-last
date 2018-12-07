import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { AddFilterComponent } from './add-filter/add-filter.component';
import { EditFilterComponent } from './edit-filter/edit-filter.component';
import * as moment from 'moment';
import { FilterService } from '../../../services/filter.service';

@Component({
  selector: '<app-filter-management></app-filter-management>',
  templateUrl: './filter-management.component.html',
  styleUrls: [
    './filter-management.component.scss',
    '../../../../assets/icon/icofont/css/icofont.scss'
  ]
})
export class FilterManagementComponent implements OnInit {
  deleting: Boolean;
  showMessage: any;
  constructor(
    private filterService: FilterService,
    private modalService: NgbModal
  ) {
  }
  search_input: string = null;
  editing = {};
  rows = [];
  temp_rows = [];
  ngOnInit() {
    this.getFilters();
  }

  getFilters() {
    this.filterService.getFilters()
      .subscribe((response: HttpResponse<any>) => {
        console.log("filters", response)
        this.rows = response['data'];
        this.temp_rows = response['data'];
      })
  }

  onSearchInputChange(val) {
    if (val) {
      val = val.toLowerCase();
      let data = this.temp_rows;
      data = data.filter(filter => {
        if (
          filter.name && filter.name.toLowerCase().indexOf(val) >= 0 ? true : false ||
          filter.type && filter.type.toLowerCase().indexOf(val) >= 0 ? true : false ||
          filter.status && filter.status.toLowerCase().indexOf(val) >= 0 ? true : false ||
          filter.createdBy.name && filter.createdBy.name.toLowerCase().indexOf(val) >= 0 ? true : false ||
          filter.createdAt && moment(filter.createdAt).format("MMM DD, YYYY").toLowerCase().indexOf(val) >= 0 ? true : false
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
        this.filterService.modifyStatus(name._id).subscribe((response: HttpResponse<any>) => {
          if (response.status === 200) {
            this.getFilters();
            swal(
              'Success!',
              'Your have activated filter successfully.',
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
        this.filterService.modifyStatus(name._id).subscribe((response: HttpResponse<any>) => {
          if (response.status === 200) {
            this.getFilters();
            swal(
              'Deactivated!',
              'Your have deactivated filter successfully.',
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
    const modalRef = this.modalService.open(AddFilterComponent);
    modalRef.result.then((result) => {
      this.getFilters();
    }).catch((error) => {
      this.getFilters();
    });
  }

  openEditFormModal(filter) {
    const modalRef = this.modalService.open(EditFilterComponent);
    modalRef.componentInstance.currentFilter = filter;
    modalRef.result.then((result) => {
      this.getFilters();
    })
      .catch((error) => {
        this.getFilters();
      });
  }

  deleteFilter(filter) {
    swal({
      title: 'Are you sure to delete filter?',
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
        this.filterService.deleteFilter(filter._id).subscribe((response: HttpResponse<any>) => {
          if (response.status === 200) {
            this.getFilters();
            swal(
              'Success!',
              'Your have deleted filter successfully.',
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

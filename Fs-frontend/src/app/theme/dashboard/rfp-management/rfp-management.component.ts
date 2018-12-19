import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import * as moment from 'moment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { RfpService } from '../../../services/rfp.service';
import { AddRfpComponent } from './add-rfp/add-rfp.component';
import { EditRfpComponent } from './edit-rfp/edit-rfp.component';


@Component({
  selector: 'app-rfp-management',
  templateUrl: './rfp-management.component.html',
  styleUrls: ['./rfp-management.component.scss']
})
export class RfpManagementComponent implements OnInit {
  deleting: Boolean;
  showMessage: any;
  search_input: string = null;
  editing: any = {};
  rows: any = [];
  temp_rows: any = [];

  constructor(
    private modalService: NgbModal,
    private rfpService: RfpService
  ) {
    this.getRfp();
  }

  ngOnInit() {
  }

  getRfp() {
    this.rfpService.getRfp().subscribe((rfp) => {
      //console.log("DATA ------------------>>>>>>>>>",JSON.stringify(rfp['data']))
      this.rows = rfp['data'];
      this.temp_rows = rfp['data'];
    })
  }

  onSearchInputChange(val) {
    if (val) {
      val = val.toLowerCase();
      let data = this.temp_rows;
      data = data.filter(rfp => {
        if (
          rfp.name && rfp.name.toLowerCase().indexOf(val) >= 0 ? true : false ||
          rfp.company && rfp.company.toLowerCase().indexOf(val) >= 0 ? true : false ||
          rfp.email && rfp.email.toLowerCase().indexOf(val) >= 0 ? true : false ||
          rfp.description && rfp.description.toLowerCase().indexOf(val) >= 0 ? true : false ||
          rfp.status && rfp.status.toLowerCase().indexOf(val) >= 0 ? true : false ||
          rfp.timeStart && moment(rfp.timeStart).format("MMM DD, YYYY").toLowerCase().indexOf(val) >= 0 ? true : false ||
          rfp.timeEnd && moment(rfp.timeEnd).format("MMM DD, YYYY").toLowerCase().indexOf(val) >= 0 ? true : false
        )
          return true;
      });
      this.rows = data;
    } else this.rows = this.temp_rows;
  }

  openSuccessSwal() {
    swal({
      title: 'Successful!',
      text: 'RFP updated successfully!',
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

  activateRfp(name) {
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
        this.rfpService.modifyStatus(name._id).subscribe((response: HttpResponse<any>) => {
          if (response.status === 200) {
            this.getRfp();
            swal(
              'Success!',
              'Your have activated RFP successfully.',
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
        this.rfpService.modifyStatus(name._id).subscribe((response: HttpResponse<any>) => {
          if (response.status === 200) {
            this.getRfp();
            swal(
              'Deleted!',
              'Your have deactivated RFP successfully.',
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
    const modalRef = this.modalService.open(AddRfpComponent);
    modalRef.result.then((result) => {
      this.getRfp();
    }).catch((error) => {
      this.getRfp();
    });
  }

  openEditFormModal(rfp) {
    const modalRef = this.modalService.open(EditRfpComponent);
    modalRef.componentInstance.currentRfp = rfp;
    modalRef.result.then((result) => {
      this.getRfp();
    })
      .catch((error) => {
        this.getRfp();
      });
  }

  deleteRfp(rfp) {
    swal({
      title: 'Are you sure to delete RFP?',
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
        this.rfpService.deleteRfp(rfp._id).subscribe((response: HttpResponse<any>) => {
          if (response.status === 200) {
            this.getRfp();
            swal(
              'Success!',
              'Your have deleted RFP successfully.',
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

import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { VatManagementService } from '../../../services/vat-management.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EditVatComponent } from './edit-vat/edit-vat.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: '<app-vat-management></app-vat-management>',
  templateUrl: './vat-management.component.html',
  styleUrls: [
    './vat-management.component.scss',
    '../../../../assets/icon/icofont/css/icofont.scss'
  ]
})
export class VatManagementComponent implements OnInit {
  deleting: Boolean;
  showMessage: any;
  constructor(
    private vatService: VatManagementService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private ngbModal: NgbModal
  ) {
    this.getVats();
  }
  search_input: string = null;
  editing = {};
  rows = [];
  temp_rows = [];
  ngOnInit() {

  }

  getVats() {
    this.vatService.getVat()
      .subscribe(vat => {
        this.rows = vat['data'];
        console.log("this rowsssssssssssss", this.rows);
        this.temp_rows = vat['data'];
      })
  }

  onSearchInputChange(val) {
    if (val) {
      val = val.toLowerCase();
      let data = this.temp_rows;
      data = data.filter(vat => {
        console.log("vat to filter", vat);
        if (
          vat.country && vat.country['name'].toLowerCase().indexOf(val) >= 0 ? true : false ||
            vat.status && vat.status.toLowerCase().indexOf(val) >= 0 ? true : false
        )
          return true;
      });
      this.rows = data;
    } else {
      this.rows = this.temp_rows;
    }
  }

  activateVat(row) {
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
        this.vatService.modifyStatusOfVat(row._id).subscribe((response: HttpResponse<any>) => {
          if (response.status === 200) {
            this.getVats();
            swal(
              'Success!',
              'Your have activated VAT successfully.',
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


  deactivateVat(row) {
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
        this.vatService.modifyStatusOfVat(row._id).subscribe((response: HttpResponse<any>) => {
          if (response.status === 200) {
            this.getVats();
            swal(
              'Deleted!',
              'Your have deactivated VAT successfully.',
              'success'
            );
          }
          else {

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

  openSuccessSwal() {
    swal({
      title: 'Successful!',
      text: 'Vat status updated successfully!',
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

  onAddNewVat() {
    this.router.navigate(['./add'], { relativeTo: this.activatedRoute });
  }

  editVat(vat) {
    const modalRef = this.ngbModal.open(EditVatComponent);
    modalRef.componentInstance.currentVat = vat;
    modalRef.result.then((result) => {
      this.getVats();
    })
      .catch((error) => {
        this.getVats();
      });
  }





}

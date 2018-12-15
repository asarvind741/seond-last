import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { AddFeatureComponent } from './add-feature-module/add-feature-module.component';
import { EditFeatureComponent } from './edit-feature-module/edit-feature-module.component';
import { FeatureService } from '../../../services/feature.service'
import * as moment from 'moment';

@Component({
  selector: '<app-feature-management></app-feature-management>',
  templateUrl: './feature-management.component.html',
  styleUrls: [
    './feature-management.component.scss',
    '../../../../assets/icon/icofont/css/icofont.scss'
  ]
})
export class FeatureManagementComponent implements OnInit {
  deleting: Boolean;
  showMessage: any;

  constructor(
    private featureService: FeatureService,
    private modalService: NgbModal
  ) {
  }
  search_input: string = null;
  editing = {};
  rows = [];
  temp_rows = [];
  ngOnInit() {
    this.getFeatures();
  }

  getFeatures() {
    this.featureService.getFeatures()
      .subscribe((response: HttpResponse<any>) => {
        console.log("response", response);
        if (response['data'].length > 0) {
          this.rows = response['data'];

          this.temp_rows = response['data'];
        }
      })
  }

  onSearchInputChange(val) {
    if (val) {
      val = val.toLowerCase();
      let data = this.temp_rows;
      data = data.filter(feature => {
        let features = '';
        feature.feature.forEach(feat => {
          feat = feat.toString();
          features = features + feat;
        })
        if (
          feature.name && feature.name.toLowerCase().indexOf(val) >= 0 ? true : false ||
          feature.role && feature.role.toLowerCase().indexOf(val) >= 0 ? true : false ||
          feature.status && feature.status.toLowerCase().indexOf(val) >= 0 ?  true : false ||
          feature.createdAt && moment(feature.createdAt).format("MMM DD, YYYY").toLowerCase().indexOf(val) >= 0 ? true : false ||
          feature.createdBy && feature.createdBy.name.toLowerCase().indexOf(val) >= 0 ? true: false ||
          features && features.toLowerCase().indexOf(val) >= 0 ? true: false
        )
      return true;
    });
    this.rows = data;
  } else this.rows = this.temp_rows;
  }

openSuccessSwal() {
  swal({
    title: 'Successful!',
    text: 'Feature module updated successfully!',
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

activateCouppon(name) {
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
      this.featureService.modifyStatus(name._id).subscribe((response: HttpResponse<any>) => {
        if (response.status === 200) {
          this.getFeatures();
          swal(
            'Activated!',
            'Your have activated feature module successfully.',
            'success'
          );
        }
      });

    } else if (result.dismiss) {
      swal(
        'Cancelled',
        'Activation request cancelled.)',
        'error'
      );
    }
  });
}

deleteSubscription(subscription){
  swal({
    title: 'Are you sure to delete feature module?',
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
      this.featureService.deleteFeature(subscription._id).subscribe((response: HttpResponse<any>) => {
        if (response.status === 200) {
          this.getFeatures();
          swal(
            'Deleted!',
            'Your have deleted feature module successfully.',
            'success'
          );
        }
      });

    } else if (result.dismiss) {
      swal(
        'Cancelled',
        'Delete request cancelled',
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
      this.featureService.modifyStatus(name._id).subscribe((response: HttpResponse<any>) => {
        if (response.status === 200) {
          this.getFeatures();
          swal(
            'Deactivated!',
            'Your have deactivated feature module successfully.',
            'success'
          );
        }
      });

    } else if (result.dismiss) {
      swal(
        'Cancelled',
        'Deactivation request cancelled.)',
        'error'
      );
    }
  });
  this.deleting = false;

}

openFormModal() {
  const modalRef = this.modalService.open(AddFeatureComponent);
  modalRef.result.then((result) => {
    this.getFeatures();
  }).catch((error) => {
    this.getFeatures();
  });
}

openEditFormModal(feature) {
  const modalRef = this.modalService.open(EditFeatureComponent);
  modalRef.componentInstance.currentFeature = feature;
  modalRef.result.then((result) => {
    this.getFeatures();
  })
    .catch((error) => {
      this.getFeatures();
    });
}
}

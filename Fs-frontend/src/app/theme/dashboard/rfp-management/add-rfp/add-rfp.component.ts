import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
import { RfpService } from '../../../../services/rfp.service';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-add-rfp',
  templateUrl: './add-rfp.component.html',
  styleUrls: ['./add-rfp.component.scss']
})
export class AddRfpComponent implements OnInit {
  newRfpForm: FormGroup;
  showMessage: any;
  documentCount: number = 0;
  statuss: Array<String> = ['Active', 'Inactive'];
  documents: any = [];
  constructor(
    public activeModal: NgbActiveModal,
    private rfpService: RfpService
  ) { }

  ngOnInit() {
    this.createForm();
    
  }

  createForm() {

    let docs = new FormArray([]);
    docs.push(new FormControl());
    this.newRfpForm = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'company': new FormControl(null, [Validators.required]),
      'email': new FormControl(null),
      'mobile': new FormControl(null),
      'description': new FormControl(null),
      'timeStart': new FormControl(null),
      'timeEnd': new FormControl(null),
      'status': new FormControl(null),
      'docs': docs
    })
  }

  addMoreDocs(){
    let control = new FormControl(null);
    (<FormArray>this.newRfpForm.get('docs')).push(control);
  }

  addNewRfp() {
    console.log('sdsd')
    let data = this.newRfpForm.value;
    delete this.newRfpForm.value.docs;

    data.timeEnd = new Date(this.newRfpForm.value.timeEnd.year, this.newRfpForm.value.timeEnd.month, this.newRfpForm.value.timeEnd.day);

    data.timeStart = new Date(this.newRfpForm.value.timeStart.year, this.newRfpForm.value.timeStart.month, this.newRfpForm.value.timeStart.day)

    data.documents = this.documents;

    data.createdBy = JSON.parse(localStorage.getItem('currentUser'))._id;

    this.rfpService.addRfp(data).subscribe((response: HttpResponse<any>) => {
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
      console.log(error);
      this.closeModal();
      this.showMessage = error.error['message']
      this.openUnscuccessSwal();
    })
  }

  fileEvent($event) {
    const fileSelected: File = $event.target.files[0];
    this.rfpService.uploadDoc(fileSelected).subscribe((response: HttpResponse<any>) => {
      this.documents.push(JSON.stringify(response));
      this.documentCount = this.documentCount + 1;
    }, (error) => {
      console.log(error);
      this.closeModal();
      this.showMessage = error.error['message']
      this.openUnscuccessSwal();
    })
  }

  openSuccessSwal() {
    swal({
      title: 'Successful!',
      text: 'RFP created successfully!',
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

  clearModal() {
    this.newRfpForm.reset();
  }

}

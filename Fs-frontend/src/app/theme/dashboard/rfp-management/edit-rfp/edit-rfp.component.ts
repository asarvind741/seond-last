import { Component, OnInit, Input } from '@angular/core';
import { FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
import { RfpService } from '../../../../services/rfp.service';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';
import * as moment from 'moment';


@Component({
  selector: 'app-edit-rfp',
  templateUrl: './edit-rfp.component.html',
  styleUrls: ['./edit-rfp.component.scss']
})

export class EditRfpComponent implements OnInit {

  editRfpForm: FormGroup;
  @Input('currentRfp') currentRfp: any;
  showMessage: any;
  documentCount: number = 0;
  statuss: Array<String> = ['Active', 'Inactive'];
  documents: any = [];
  attachments: any = [];
  constructor(
    public activeModal: NgbActiveModal,
    private rfpService: RfpService
  ) { }

  ngOnInit() {
    this.createForm();
    
  }

  createForm() {
    console.log("time start", this.currentRfp.timeStart)
    let name = this.currentRfp.name ? this.currentRfp.name: null;
    let company = this.currentRfp.company ? this.currentRfp.company: null;
    let email = this.currentRfp.email ? this.currentRfp.email: null;
    let mobile = this.currentRfp.mobile ? this.currentRfp.mobile: null;
    let description = this.currentRfp.description ? this.currentRfp.description: null;
    let timeStart = this.currentRfp.timeStart ? this.currentRfp.timeStart: null;
    let timeEnd = this.currentRfp.timeStart ? this.currentRfp.timeEnd: null;
    let status = this.currentRfp.status ? this.currentRfp.status: null;

    let docs = new FormArray([]);

    
    if(this.currentRfp.documents.length > 0){
      this.currentRfp.documents.forEach((doc) => {
        this.documentCount = this.documentCount  + 1;
        this.documents.push(doc);
        this.attachments.push(doc.split('/')[4].replace('"', ''));
        // docs.push(new FormControl(doc))
        
      })
    }
    this.editRfpForm = new FormGroup({
      'name': new FormControl(name, [Validators.required]),
      'company': new FormControl(company, [Validators.required]),
      'email': new FormControl(email, [Validators.required]),
      'mobile': new FormControl(mobile),
      'description': new FormControl(description),
      'timeStart': new FormControl(timeStart),
      'timeEnd': new FormControl(timeEnd),
      'status': new FormControl(status),
      'docs': docs
    });

    this.editRfpForm.get('timeStart').setValue({
      year: parseInt(moment(timeStart).format('YYYY')),
      month: parseInt(moment(timeStart).format('M')),
      day: parseInt(moment(timeStart).format('D'))
    });

    this.editRfpForm.get('timeEnd').setValue({
      year: parseInt(moment(timeEnd).format('YYYY')),
      month: parseInt(moment(timeEnd).format('M')),
      day: parseInt(moment(timeEnd).format('D'))
    });

  }

  addMoreDocs(){
    let control = new FormControl(null);
    (<FormArray>this.editRfpForm.get('docs')).push(control);
  }

  updateRfq() {
    let data = this.editRfpForm.value;
    delete this.editRfpForm.value.docs;

    data.timeEnd = new Date(this.editRfpForm.value.timeEnd.year, this.editRfpForm.value.timeEnd.month, this.editRfpForm.value.timeEnd.day);

    data.timeStart = new Date(this.editRfpForm.value.timeStart.year, this.editRfpForm.value.timeStart.month, this.editRfpForm.value.timeStart.day)

    data.documents = this.documents;

    data.createdBy = JSON.parse(localStorage.getItem('currentUser'))._id;

    this.rfpService.updateRfp(this.currentRfp._id, data).subscribe((response: HttpResponse<any>) => {
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

  fileEvent($event) {
    const fileSelected: File = $event.target.files[0];
    this.rfpService.uploadDoc(fileSelected).subscribe((response: HttpResponse<any>) => {
      this.documents.push(JSON.stringify(response));
      this.attachments.push(JSON.stringify(response).split('/')[4].replace('"', ''))
      this.documentCount = this.documentCount + 1;
    }, (error) => {
      this.closeModal();
      this.showMessage = error.error['message']
      this.openUnscuccessSwal();
    })
  }

  removeDoc(doc){
    this.documents.forEach((document, i) => {
      if(document.indexOf(doc) >= 0){
        this.documents.splice(i, 1);
        const index = this.attachments.indexOf(doc);
        this.attachments.splice(index, 1)
        console.log("this docs", this.documents)
      }
    })
  }


  openSuccessSwal() {
    swal({
      title: 'Successful!',
      text: 'RFQ updated successfully!',
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
    this.editRfpForm.reset();
  }

}

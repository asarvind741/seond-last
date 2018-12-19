import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import * as moment from 'moment';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { SearchHistoryService } from '../../../services/search-history.service';

@Component({
  selector: 'app-search-history',
  templateUrl: './search-history.component.html',
  styleUrls: ['./search-history.component.scss']
})
export class SearchHistoryComponent implements OnInit {
  visitHistory: any = [];
  noHistory: Boolean;

  constructor(
    private searchHistoryService: SearchHistoryService
  ) {
  }

  ngOnInit() {

    this.searchHistoryService.getSearchHistoryOfUser()
      .subscribe((response: HttpResponse<any>) => {
        console.log("response", response)
        if (response.status === 200) {
          if (response['data']) {
            this.visitHistory = response['data'];
            this.noHistory = false;
          }
          else {
            this.noHistory = true;
          }
        }
      }, (error: HttpErrorResponse) => {
        this.openUnscuccessSwal();
      })
  }

  openUnscuccessSwal() {
    swal({
      title: 'Cancelled!',
      text: 'Unexpected Error occured',
      type: 'error'
    }).catch(swal.noop);
  }


}

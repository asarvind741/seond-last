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
  searchTerm: String = '';
  visitedUrls: any = [];
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
            this.visitedUrls = this.visitHistory.visitedUrls
            this.visitHistory.visitedUrls.forEach(item => {
              console.log("item", item)
            })
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

  searchFunction(event) {
    this.searchTerm = event.target.value;
    console.log(this.searchTerm);
    this.visitedUrls = this.visitHistory.visitedUrls.filter(urlObj => {
      console.log(urlObj.url.indexOf(this.searchTerm) >= 0, 'test')

      return urlObj.url.indexOf(this.searchTerm) >= 0
    })
  }

  searchFromInput() {

    this.visitedUrls = this.visitHistory.visitedUrls.filter(urlObj => {
      // console.log(urlObj.url.indexOf(this.searchTerm) >= 0, 'test')

      return urlObj.url.indexOf(this.searchTerm) >= 0
    })
  }
}

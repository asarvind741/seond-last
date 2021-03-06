import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ElasticSearchService } from '../../services/elastic-search.service'
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  index: any;
  serarchTerm: any;
  type: any;
  productList: any = [];
  productFilters: any = [];
  filterList: any = [];
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private elastiService: ElasticSearchService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams
      .subscribe((params: Params) => {
        this.index = params['indexArea'];
        this.serarchTerm = params['search_text']
        this.elastiService.searchProductsFromElastiIndex(this.index, this.serarchTerm)
        .then((response: any) => {
         this.productList = response.hits.hits;
         this.productFilters = response.aggregations.filters.key_name.buckets;
         console.log("this product list", this.productFilters[0].key_value);
        })
      })
  }

}

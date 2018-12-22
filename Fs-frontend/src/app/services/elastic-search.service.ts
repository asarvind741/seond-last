import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Client, SearchResponse } from 'elasticsearch-browser';

@Injectable({
  providedIn: 'root'
})
export class ElasticSearchService implements OnInit {
  private client: Client;

  constructor() {
    if (!this.client) {
      this._connect();
    }
  }
  ngOnInit() { }

  private _connect() {
    this.client = new Client({
      hosts: ['http://40.71.47.14:9200'],
      requestTimeout: Infinity, // Tested
      keepAlive: true, // Tested
      log: 'trace',
      pingTimeout: 10000
    });
  }

  isAvailable(): any {
    this.client.ping(
      {
        requestTimeout: Infinity,
        body: 'elasticsearch!'
      },
      err => {
        if (err) {
          console.log('error', err);
        } else {
          console.log('data');
        }
      }
    );
  }

  serchCategories(_queryText): any {
    return this.client.search({
      body: {
        query: {
          match_phrase_prefix: {
            name: _queryText
          }
        }
      },
      // _source: ['name']
    });
  }

  searchProductsFromElastiIndex(index, searchTerm): any {
    return this.client.search({
      index: index,
      body: {
        query: {
          match: {
            name: searchTerm
          }
        },
        aggs: {
          filters: {
            nested: {
              path: 'filters'
            },
            aggs: {
              key_name: {
                terms: {
                  field: 'filters.name'
                },
                aggs: {
                  key_value: {
                    terms: {
                      field: 'filters.value'
                    }
                  }
                }
              }
            }
          }
        }
      }
    });
  }
}

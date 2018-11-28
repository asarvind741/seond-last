import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Client, SearchResponse } from "elasticsearch-browser";

@Injectable({
    providedIn: 'root'
})

export class ElasticSearchService implements OnInit{

    private client: Client;

    constructor(){
        if(!this.client){
            this._connect()
        }
    }
    ngOnInit(){
    }

    private _connect() {
        this.client = new Client({
            hosts: [ 
                'http://40.71.47.14:9200',
            ],
            requestTimeout: Infinity, // Tested
            keepAlive: true, // Tested
            log: 'trace',
            pingTimeout: 10000,

        });
    }

    isAvailable(): any {
        this.client.ping({
            requestTimeout: Infinity,
            body: "elasticsearch!"
        }, (err) => {
            if(err){
                console.log("error", err);
            }
            else {
                console.log("data", )
            }
        });
    }

    serchCategories(_queryText): any {
        return this.client.search({
            index:'categories',
            type:'Material',
            body: {
                'query': {
                  'match_phrase_prefix': {
                    CategoryName: _queryText,
                  }
                }
              },
            _source: ['CategoryName']
        })
    }

}
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { environment } from '../environments/environment';
import { SearchHistoryService } from './services/search-history.service';
import { HttpResponse } from '@angular/common/http';
import { SocketService } from './services/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Gradient Able 5+';

  constructor(
    private router: Router,
    private searchHistoryService: SearchHistoryService,
    private socketService: SocketService
  ) { }

  ngOnInit() {
    this.socketService.onNewNotification().subscribe(msg => {
      console.log('msg came', msg);
    });
    this.socketService.socket.on('error', function (err) {
      console.log(err);
    });
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      else {
        let visitedUrl = environment.API_URL + this.router.url;
        console.log("this router", this.router.url);
        this.searchHistoryService.saveVisitedUrl(visitedUrl, JSON.parse(localStorage.getItem('currentUser'))._id)
          .subscribe((response: HttpResponse<any>) => {
            console.log('response', response)
          });
        window.scrollTo(0, 0);
      }
    });
  }
}

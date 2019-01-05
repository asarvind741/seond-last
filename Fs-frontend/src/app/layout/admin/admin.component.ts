import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import {
    animate,
    AUTO_STYLE,
    state,
    style,
    transition,
    trigger
} from '@angular/animations';
import { MenuItems } from '../../shared/menu-items/menu-items';
import { AuthenticationService } from '../../services/auth.service';
import { ElasticSearchService } from '../../services/elastic-search.service';
import { Observable } from 'rxjs/Observable';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { SocketService } from 'src/app/services/socket.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ToastrService } from 'ngx-toastr';


@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss'],
    animations: [
        trigger('notificationBottom', [
            state(
                'an-off, void',
                style({
                    overflow: 'hidden',
                    height: '0px'
                })
            ),
            state(
                'an-animate',
                style({
                    overflow: 'hidden',
                    height: AUTO_STYLE
                })
            ),
            transition('an-off <=> an-animate', [animate('400ms ease-in-out')])
        ]),
        trigger('notificationBottom1', [
            state(
                'an-off, void',
                style({
                    overflow: 'hidden',
                    height: '0px'
                })
            ),
            state(
                'open',
                style({
                    overflow: 'auto',
                    height: '400px'
                })
            ),
            state(
                'an-animate',
                style({
                    overflow: 'auto',
                    height: '400px'
                })
            ),
            transition('an-off <=> an-animate', [animate('400ms ease-in-out')])
        ]),
        trigger('slideInOut', [
            state(
                'in',
                style({
                    width: '300px'
                    // transform: 'translate3d(0, 0, 0)'
                })
            ),
            state(
                'out',
                style({
                    width: '0'
                    // transform: 'translate3d(100%, 0, 0)'
                })
            ),
            transition('in => out', animate('400ms ease-in-out')),
            transition('out => in', animate('400ms ease-in-out'))
        ]),
        trigger('mobileHeaderNavRight', [
            state(
                'nav-off, void',
                style({
                    overflow: 'hidden',
                    height: '0px'
                })
            ),
            state(
                'nav-on',
                style({
                    height: AUTO_STYLE
                })
            ),
            transition('nav-off <=> nav-on', [animate('400ms ease-in-out')])
        ]),
        trigger('fadeInOutTranslate', [
            transition(':enter', [
                style({ opacity: 0 }),
                animate('400ms ease-in-out', style({ opacity: 1 }))
            ]),
            transition(':leave', [
                style({ transform: 'translate(0)' }),
                animate('400ms ease-in-out', style({ opacity: 0 }))
            ])
        ])
    ]
})
export class AdminComponent implements OnInit {
    searchItem: String;
    addScroll: boolean = false;
    currentUserRole: String = "Buyer";
    showResult: Boolean = true;
    itemsSearched: Array<any> = [];
    notifications: Array<any> = [{ message: 'Lorem ipsum dolor sit amet, consectetuer elit.', time: '30 minutes ago' }];
    newNotification: Boolean = false
    lastKeypress = 0;
    categories: Array<String> = ['first', 'second', 'third', 'fourth'];
    public navType: string;
    public themeLayout: string;
    public verticalPlacement: string;
    public verticalLayout: string;
    public pcodedDeviceType: string;
    public verticalNavType: string;
    public verticalEffect: string;
    public vnavigationView: string;
    public freamType: string;
    public sidebarImg: string;
    public sidebarImgType: string;
    public layoutType: string;

    public headerTheme: string;
    public pcodedHeaderPosition: string;

    public liveNotification: string;
    public liveNotificationClass: string;

    public profileNotification: string;
    public profileNotificationClass: string;

    public chatSlideInOut: string;
    public innerChatSlideInOut: string;

    public searchWidth: number;
    public searchWidthString: string;

    public navRight: string;
    public windowWidth: number;
    public chatTopPosition: string;

    public toggleOn: boolean;
    public navBarTheme: string;
    public activeItemTheme: string;
    public pcodedSidebarPosition: string;

    public menuTitleTheme: string;
    public dropDownIcon: string;
    public subItemIcon: string;

    public configOpenRightBar: string;
    public displayBoxLayout: string;
    public isVerticalLayoutChecked: boolean;
    public isSidebarChecked: boolean;
    public isHeaderChecked: boolean;
    public headerFixedMargin: string;
    public sidebarFixedHeight: string;
    public itemBorderStyle: string;
    public subItemBorder: boolean;
    public itemBorder: boolean;

    public config: any;

    constructor(
        public menuItems: MenuItems,
        private authService: AuthenticationService,
        private router: Router,
        private elasticSearchService: ElasticSearchService,
        private activatedRoute: ActivatedRoute,
        private socketService: SocketService,
        private notificationService: NotificationService,
        private toastrService: ToastrService,

    ) {

        this.navType = 'st2';
        this.themeLayout = 'vertical';
        this.verticalPlacement = 'left';
        this.verticalLayout = 'wide';
        this.pcodedDeviceType = 'desktop';
        this.verticalNavType = 'expanded';
        this.verticalEffect = 'shrink';
        this.vnavigationView = 'view1';
        this.freamType = 'theme1';
        this.sidebarImg = 'false';
        this.sidebarImgType = 'img1';
        this.layoutType = 'light';

        this.headerTheme = 'themelight5';
        this.pcodedHeaderPosition = 'fixed';

        this.liveNotification = 'an-off';
        this.profileNotification = 'an-off';

        this.chatSlideInOut = 'out';
        this.innerChatSlideInOut = 'out';

        this.searchWidth = 0;

        this.navRight = 'nav-on';

        this.windowWidth = window.innerWidth;
        this.setHeaderAttributes(this.windowWidth);

        this.toggleOn = true;
        this.navBarTheme = 'themelight1';
        this.activeItemTheme = 'theme10';
        this.pcodedSidebarPosition = 'fixed';
        this.menuTitleTheme = 'theme1';
        this.dropDownIcon = 'style3';
        this.subItemIcon = 'style7';

        this.displayBoxLayout = 'd-none';
        this.isVerticalLayoutChecked = false;
        this.isSidebarChecked = true;
        this.isHeaderChecked = true;
        this.headerFixedMargin = '56px';
        this.sidebarFixedHeight = 'calc(100vh - 56px)';
        this.itemBorderStyle = 'none';
        this.subItemBorder = true;
        this.itemBorder = true;

        this.setMenuAttributes(this.windowWidth);
        this.setHeaderAttributes(this.windowWidth);

        // dark
        /*this.setLayoutType('dark');*/

        // light-dark
        /*this.setLayoutType('dark');
        this.setNavBarTheme('themelight1');*/

        // dark-light
        /*this.setNavBarTheme('theme1');*/

        // side-bar image
        /*this.setLayoutType('img');*/
    }

    ngOnInit() {
        const user = JSON.parse(localStorage.getItem('currentUser'));

        this.socketService.onLogin({ 'userId': user._id, 'name': user.name });
        this.currentUserRole = JSON.parse(this.authService.getCurrentUser()).role;
        ;
        if (this.currentUserRole === "Buyer")
            this.setLayoutType('img')
        else if (this.currentUserRole === "Supplier") {
            this.setLayoutType('img')
        }
        else if (this.currentUserRole === "Admin") {
            this.setLayoutType('light')
        }
        else {
            this.setLayoutType('light')
        }
        this.elasticSearchService.isAvailable();

        this.notificationService.getNotifications(JSON.parse(this.authService.getCurrentUser())._id).subscribe((success) => {
            console.log(success, 'success');
            this.notifications = success['data'];
            if (this.notifications.length > 4) {
                this.addScroll = true
            }
        }, (error) => {
            console.log(error, 'error')
        })
        this.socketService.onNewNotification().subscribe(msg => {
            this.newNotification = true;
            this.notifications.unshift({ message: msg.message, time: this.timeDifference(new Date(msg.time).getTime()) })
            this.toastrService.info(msg.message, 'New',
                { timeOut: 10000, positionClass: 'toast-top-right', closeButton: true, toastClass: 'toast' });

        });
        this.socketService.socket.on('error', function (err) {
        });
        /*document.querySelector('body').classList.remove('dark');*/
    }

    timeDifference(previous) {
        var msPerMinute = 60 * 1000;
        var msPerHour = msPerMinute * 60;
        var msPerDay = msPerHour * 24;
        var msPerMonth = msPerDay * 30;
        var msPerYear = msPerDay * 365;
        let current = Date.now();

        var elapsed = current - previous;
        elapsed = elapsed / 10;
        console.log(current, previous, elapsed, '======', msPerMinute, msPerHour);

        if (elapsed < msPerMinute) {
            return Math.round(elapsed / 1000) + ' seconds ago';
        }

        else if (elapsed < msPerHour) {
            return Math.round(elapsed / msPerMinute) + ' minutes ago';
        }

        else if (elapsed < msPerDay) {
            return Math.round(elapsed / msPerHour) + ' hours ago';
        }

        else if (elapsed < msPerMonth) {
            return 'approximately ' + Math.round(elapsed / msPerDay) + ' days ago';
        }

        else if (elapsed < msPerYear) {
            return 'approximately ' + Math.round(elapsed / msPerMonth) + ' months ago';
        }

        else {
            return 'approximately ' + Math.round(elapsed / msPerYear) + ' years ago';
        }
    }

    onResize(event) {
        this.windowWidth = event.target.innerWidth;
        this.setHeaderAttributes(this.windowWidth);

        let reSizeFlag = true;
        if (
            this.pcodedDeviceType === 'tablet' &&
            this.windowWidth >= 768 &&
            this.windowWidth <= 1024
        ) {
            reSizeFlag = false;
        } else if (this.pcodedDeviceType === 'mobile' && this.windowWidth < 768) {
            reSizeFlag = false;
        }
        /* for check device */
        if (reSizeFlag) {
            this.setMenuAttributes(this.windowWidth);
        }
    }

    setHeaderAttributes(windowWidth) {
        if (windowWidth < 992) {
            this.navRight = 'nav-off';
        } else {
            this.navRight = 'nav-on';
        }
    }

    logoutUser() {
        this.authService.logoutUser();
        this.router.navigate(['/auth/login'])

    }


    search = (text$: Observable<string>) =>
        text$.pipe(
            debounceTime(200),
            distinctUntilChanged(),
            map(term => {
                this.showResult = false;
                this.itemsSearched = [];
                this.elasticSearchService
                    .serchCategories(term)
                    .then(response => {
                        response.hits.hits.forEach(hit => {
                            // if (this.itemsSearched.indexOf(hit._source['name']) < 0)
                            this.itemsSearched.push(hit);
                        });
                    });
            })
        )

    onSeachButtonClicked() {
    }

    setMenuAttributes(windowWidth) {
        if (windowWidth >= 768 && windowWidth <= 1024) {
            this.pcodedDeviceType = 'tablet';
            this.verticalNavType = 'offcanvas';
            this.verticalEffect = 'overlay';
        } else if (windowWidth < 768) {
            this.pcodedDeviceType = 'mobile';
            this.verticalNavType = 'offcanvas';
            this.verticalEffect = 'overlay';
        } else {
            this.pcodedDeviceType = 'desktop';
            this.verticalNavType = 'expanded';
            this.verticalEffect = 'shrink';
        }
    }

    toggleHeaderNavRight() {
        this.navRight = this.navRight === 'nav-on' ? 'nav-off' : 'nav-on';
        this.chatTopPosition = this.chatTopPosition === 'nav-on' ? '112px' : '';
        if (this.navRight === 'nav-off' && this.innerChatSlideInOut === 'in') {
            this.toggleInnerChat();
        }
        if (this.navRight === 'nav-off' && this.chatSlideInOut === 'in') {
            this.toggleChat();
        }
    }

    toggleLiveNotification() {
        this.newNotification = false;
        this.liveNotification =
            this.liveNotification === 'an-off' ? 'an-animate' : 'an-off';
        this.liveNotificationClass =
            this.liveNotification === 'an-animate' ? 'active' : '';

        if (
            this.liveNotification === 'an-animate' &&
            this.innerChatSlideInOut === 'in'
        ) {
            this.toggleInnerChat();
        }
        if (
            this.liveNotification === 'an-animate' &&
            this.chatSlideInOut === 'in'
        ) {
            this.toggleChat();
        }
    }

    toggleProfileNotification() {
        this.profileNotification =
            this.profileNotification === 'an-off' ? 'an-animate' : 'an-off';
        this.profileNotificationClass =
            this.profileNotification === 'an-animate' ? 'active' : '';

        if (
            this.profileNotification === 'an-animate' &&
            this.innerChatSlideInOut === 'in'
        ) {
            this.toggleInnerChat();
        }
        if (
            this.profileNotification === 'an-animate' &&
            this.chatSlideInOut === 'in'
        ) {
            this.toggleChat();
        }
    }

    notificationOutsideClick(ele: string) {
        if (ele === 'live' && this.liveNotification === 'an-animate') {
            this.toggleLiveNotification();
        } else if (ele === 'profile' && this.profileNotification === 'an-animate') {
            this.toggleProfileNotification();
        }
    }

    selectFromSearch(item) {
        this.showResult = true;
        this.searchItem = item._source['name'];
        let queryParams = { 'indexArea': item['_index'], 'type': item['_type'], 'search_text': this.searchItem };
        this.router.navigate(['./search'], { queryParams: queryParams, relativeTo: this.activatedRoute })
    }

    toggleChat() {
        this.chatSlideInOut = this.chatSlideInOut === 'out' ? 'in' : 'out';
        if (this.innerChatSlideInOut === 'in') {
            this.innerChatSlideInOut = 'out';
        }
    }

    toggleInnerChat() {
        this.innerChatSlideInOut =
            this.innerChatSlideInOut === 'out' ? 'in' : 'out';
    }




    toggleOpened() {
        if (this.windowWidth < 992) {
            this.toggleOn =
                this.verticalNavType === 'offcanvas' ? true : this.toggleOn;
            if (this.navRight === 'nav-on') {
                this.toggleHeaderNavRight();
            }
        }
        this.verticalNavType =
            this.verticalNavType === 'expanded' ? 'offcanvas' : 'expanded';
    }

    onClickedOutsideSidebar(e: Event) {
        if (
            (this.windowWidth < 992 &&
                this.toggleOn &&
                this.verticalNavType !== 'offcanvas') ||
            this.verticalEffect === 'overlay'
        ) {
            this.toggleOn = true;
            this.verticalNavType = 'offcanvas';
        }
    }

    toggleRightbar() {
        this.configOpenRightBar = this.configOpenRightBar === 'open' ? '' : 'open';
    }

    setNavBarTheme(theme: string) {
        if (theme === 'themelight1') {
            this.navBarTheme = 'themelight1';
            this.menuTitleTheme = 'theme1';
            this.sidebarImg = 'false';
        } else {
            this.menuTitleTheme = 'theme6';
            this.navBarTheme = 'theme1';
            this.sidebarImg = 'false';
        }
    }

    setLayoutType(type: string) {
        this.layoutType = type;
        if (type === 'dark') {
            this.headerTheme = 'theme1';
            this.sidebarImg = 'false';
            this.navBarTheme = 'theme1';
            this.menuTitleTheme = 'theme6';
            document.querySelector('body').classList.add('dark');
        } else if (type === 'light') {
            this.sidebarImg = 'false';
            this.headerTheme = 'themelight5';
            this.navBarTheme = 'themelight1';
            this.menuTitleTheme = 'theme1';
            document.querySelector('body').classList.remove('dark');
        } else if (type === 'img') {
            this.sidebarImg = 'true';
            this.headerTheme = 'theme1';
            this.navBarTheme = 'theme1';
            this.menuTitleTheme = 'theme6';
            document.querySelector('body').classList.remove('dark');
        }
    }

    setVerticalLayout() {
        this.isVerticalLayoutChecked = !this.isVerticalLayoutChecked;
        if (this.isVerticalLayoutChecked) {
            this.verticalLayout = 'box';
            this.displayBoxLayout = '';
        } else {
            this.verticalLayout = 'wide';
            this.displayBoxLayout = 'd-none';
        }
    }

    setBackgroundPattern(pattern: string) {
        document.querySelector('body').setAttribute('themebg-pattern', pattern);
    }

    setSidebarPosition() {
        this.isSidebarChecked = !this.isSidebarChecked;
        this.pcodedSidebarPosition =
            this.isSidebarChecked === true ? 'fixed' : 'absolute';
        this.sidebarFixedHeight =
            this.isHeaderChecked === true
                ? 'calc(100vh + 56px)'
                : 'calc(100vh - 56px)';
    }

    setHeaderPosition() {
        this.isHeaderChecked = !this.isHeaderChecked;
        this.pcodedHeaderPosition =
            this.isHeaderChecked === true ? 'fixed' : 'relative';
        this.headerFixedMargin = this.isHeaderChecked === true ? '56px' : '';
    }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventCalendarComponent } from './event-calendar.component';
import { EventCalendarRoutingModule } from './event-calendar-routing.module';
import {SharedModule} from '../../../shared/shared.module';

import {MwlUtilsCalendarHeaderComponent} from './mwl-utils-calendar-header/mwl-utils-calendar-header.component';
import {TagInputModule} from 'ngx-chips';
import {FormsModule} from '@angular/forms';
import {DragAndDropModule} from 'angular-draggable-droppable';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

@NgModule({
  imports: [
    CommonModule,
    EventCalendarRoutingModule,
    SharedModule,
    TagInputModule,
    FormsModule,
    DragAndDropModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })
  ],
  exports: [
    DragAndDropModule
  ],
  declarations: [EventCalendarComponent, MwlUtilsCalendarHeaderComponent]
})
export class EventCalendarModule { }

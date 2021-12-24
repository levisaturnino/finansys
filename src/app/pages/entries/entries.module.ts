import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { EntriesRoutingModule } from './entries-routing.module';
import { EntryListComponent } from './entry-list/entry-list.component';
import { EntryFormComponent } from './entry-form/entry-form.component';
import { IMaskModule } from 'angular-imask';
import {CalendarModule} from 'primeng/calendar';    
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [EntryListComponent,EntryFormComponent],
  imports: [
    CommonModule,
    EntriesRoutingModule,
    ReactiveFormsModule,
    IMaskModule,
    CalendarModule,
    NgbModule
    
  ]
})
export class EntriesModule { }

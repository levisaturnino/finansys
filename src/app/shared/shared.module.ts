import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';

import { IMaskModule } from 'angular-imask';
import { CalendarModule} from 'primeng/calendar';    
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    IMaskModule,
    CalendarModule,
    NgbModule,
  ],
  exports:[
    CommonModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    IMaskModule,
    CalendarModule,
    NgbModule,
  ]
})
export class SharedModule { }

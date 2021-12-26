import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';

import { IMaskModule } from 'angular-imask';
import { CalendarModule} from 'primeng/calendar';    
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgxSpinnerModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    IMaskModule,
    CalendarModule,
    NgbModule,
  ],
  exports:[
    CommonModule,
    NgxSpinnerModule,
    ToastrModule,
    ReactiveFormsModule,
    IMaskModule,
    CalendarModule,
    NgbModule,
  ]
})
export class SharedModule { }

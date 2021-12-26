import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';

import { IMaskModule } from 'angular-imask';
import { CalendarModule} from 'primeng/calendar';    
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialAngularModule } from './material-angular.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialAngularModule,
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
    MaterialAngularModule,
  ]
})
export class SharedModule { }

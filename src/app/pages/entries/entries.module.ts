import { NgModule } from '@angular/core';

import { EntriesRoutingModule } from './entries-routing.module';
import { EntryListComponent } from './entry-list/entry-list.component';
import { EntryFormComponent } from './entry-form/entry-form.component';

import { SharedModule } from '../../shared/shared.module';
import { MaterialAngularModule } from '../../shared/material-angular.module';

@NgModule({
  declarations: [EntryListComponent,EntryFormComponent],
  imports: [
    SharedModule,
    EntriesRoutingModule,
  ]
})
export class EntriesModule { }

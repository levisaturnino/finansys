import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { LOCALE_ID, NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';

registerLocaleData(localePt);

@NgModule({                                                                                         
  declarations: [
    AppComponent
  ],
  imports: [
    CoreModule,
    AppRoutingModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  providers: [   { provide: LOCALE_ID, useValue: 'pt-BR' }],
  bootstrap: [AppComponent,]
})
export class AppModule { }

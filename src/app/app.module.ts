import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
/* MODULES */
import { MaterialModule } from './modules/mateial/material.module';
import { ResourcesModule } from './modules/resources/resources.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
/*EXTRAS */
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { CustomMatPaginatorIntl } from './shared/paginator-es';
/* COMPONENTS */
import { AllUsersComponent } from './components/users/all-users/all-users.component';
import { CrudUsersComponent } from './components/users/crud-users/crud-users.component';
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';;
import { SnackbarComponent } from './shared/snackbar/snackbar.component';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';

import { LevelPipe } from './shared/level.pipe';
import { TooltipLevelPipe } from './shared/tooltip-level.pipe';
import { LoadingComponent } from './shared/loading/loading.component';
import { HomeComponent } from './components/home/home.component';
import { MomentModule } from 'ngx-moment';
import * as moment  from 'moment';

moment.locale('es');


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,    
    SnackbarComponent,
    LevelPipe,
    TooltipLevelPipe,
    LoadingComponent,
    HomeComponent,    
    AllUsersComponent,
    CrudUsersComponent,  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserAnimationsModule,
    MaterialModule,
    ResourcesModule,
    MatPasswordStrengthModule,
    MomentModule

  ],
  providers: [
    {
     provide: MatPaginatorIntl, 
     useClass: CustomMatPaginatorIntl
    },
    {provide: MAT_DATE_LOCALE, useValue: 'es-MX'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

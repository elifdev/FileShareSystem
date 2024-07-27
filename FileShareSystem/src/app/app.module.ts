import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { APP_CONFIG } from './app.config';
import { environment } from '../environments/environment';

import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { urlInterceptor } from './core/interceptor/url.interceptor';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './core/login/login.component';
import { SignupComponent } from './core/signup/signup.component';
import { MyfilesComponent } from './modules/myfiles/myfiles.component';
import { AllfilesComponent } from './modules/allfiles/allfiles.component';
import { HomeComponent } from './modules/home/home.component';
import { FileComponent } from './modules/file/file.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    MyfilesComponent,
    AllfilesComponent,
    FileComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
   
  ],
  providers: [
    provideHttpClient(withInterceptors([urlInterceptor])),
        {
            provide: APP_CONFIG,
            useValue: environment,
        },
        { provide: LOCALE_ID, useValue: 'tr' },
       
  ],
  bootstrap: [AppComponent],

})
export class AppModule { }

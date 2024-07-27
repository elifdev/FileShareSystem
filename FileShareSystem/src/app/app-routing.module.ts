import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/login/login.component';
import { SignupComponent } from './core/signup/signup.component';
import { HomeComponent } from './modules/home/home.component';
import { MyfilesComponent } from './modules/myfiles/myfiles.component';
import { AllfilesComponent } from './modules/allfiles/allfiles.component';
import { FileComponent } from './modules/file/file.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: HomeComponent },
  { path: 'myfiles', component: MyfilesComponent },
  { path: 'allfiles', component: AllfilesComponent },
  { path: 'file', component: FileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../../service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {


  loginForm = this.fb.nonNullable.group({
    name: '',
    email: '', 
    password: ''
  })
  
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private loginService: LoginService,
    private router: Router
  ) { }

  submit(){
    let name = this.loginForm.get('name')!.value;
    let email = this.loginForm.get('email')!.value;
    let password = this.loginForm.get('password')!.value;
    this.loginService.signup(name ,email, password).subscribe({
      next: (value) => {
        this.toastr.success('Successfully Sign Up');
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.toastr.error('Error!');
        console.error(err);
        this.loginForm.setValue({name:'' , email: '', password: '', })
        this.loginForm.patchValue({ password: '', })

      }
    });
  }

  home(){
    this.router.navigate(['/home']);
  }
}

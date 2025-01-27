import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  loggedIn = false;
  token = "";
  email = "";
  password = "";
  name = "";
 

  constructor(
    private http: HttpClient,
  ) { 
    this.token = localStorage.getItem('token') || "";
    this.email = localStorage.getItem('email') || "";
    this.password = localStorage.getItem('password') || "";
    this.loggedIn = true;
  }

  scheduleLogout() {
    setTimeout(() => {
        this.logout();
    }, 24 * 60 * 60 * 1000);
  }

  login(email: string, password: string): Observable<any> {
    this.scheduleLogout();
    return this.http.post<any>('/login', { email, password }).pipe(
      map(resp => {
        return this.parseLoginResponse(resp, email, password);
      })
    );
  }

  parseLoginResponse(data: any, email: string, password: string) {
    this.loggedIn = true;
    this.token = data.token;
    this.email = email;
    this.password = password;
    localStorage.setItem('token', data.token);
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);
    let payload = this.parseJwt(this.token);

    return data;
  }
  
  signup(name: string, email: string, password: string): Observable<any> {
    
    return this.http.post<any>('/signup', {name, email, password }).pipe(
      map(resp => {
        
        return this.parseSignupResponse(resp,name, email, password);
      })
    );
  }

  parseSignupResponse(data: any, name: string, email: string, password: string) {
    this.loggedIn = true;
    this.token = data.token;
    this.name = name;
    this.email = email;
    this.password = password;
    localStorage.setItem('token', data.token);
    localStorage.setItem('name', name);
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);
    let payload = this.parseJwt(this.token);

    return data;
  }

  relogin():Observable<any> {
    this.scheduleLogout();
    return this.login(this.email, this.password);
  }

 
  parseJwt(token: string) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }

  logout(){
    this.loggedIn = false,
    this.email = "";
    this.password = "";
    this.token = "";
  
    localStorage.clear();
  }
}

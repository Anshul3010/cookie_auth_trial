import { CookieService } from 'ngx-cookie-service';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private http: HttpClient, private cookie: CookieService) {}
  private token;

  login() {
    this.http.get('http://localhost:5000/login').subscribe((res) => {
      this.token = this.cookie.get('token');
      this.cookie.set('token', this.token);
      console.log('this is token form cookie --> ' + this.token);
    });
  }

  logout() {
    this.http.get('http://127.0.0.1:5000/logout').subscribe((res) => {
      console.log('successfully logged out');
      this.cookie.delete('token');
    });
  }

  resource() {
    this.http.get('http://127.0.0.1:5000/resource').subscribe((res) => {
      console.log(res);
    });
}
}

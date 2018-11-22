import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpService } from '../http/http.service';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  baseUrl =  environment.baseUrl;
  token = localStorage.getItem('token');

  constructor(private http: HttpService) { }

  
  userService() {
    let url = this.baseUrl+"user/service"
    return this.http.getAddService(url);
  }
  userSignup(body) {

    let url = this.baseUrl+'user/userSignUp'
    return this.http.loginPost(url, body);
  }
  userReset(body) {
    let url = this.baseUrl + 'user/reset';
    return this.http.loginPost(url, body);
  }
  resetPassword(body, accessToken) {
    let url = this.baseUrl + "user/reset-password";
    return this.http.resetPost(url, body,accessToken);
  }
  logout() {
    let url = this.baseUrl + "user/logout";
    return this.http.postArchive(url, {});
  }
  login(body) {
    let url = this.baseUrl + '/user/login';
    return this.http.loginPost(url, body);
  }
  httpAddImage(body){
    let url = this.baseUrl + 'user/uploadProfileImage';
    return this.http.image(url,body);
  }
  searchName(body)
  {
    let url = this.baseUrl + 'user/searchUserList';
    return this.http.postArchive(url, body);
  }
  
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  baseUrl =  environment.baseUrl;
  constructor(private http: HttpClient) { }

  
  // getConfig() {
  //   let url = this.baseUrl+"/user/service"
  //   return this.http.get(url);
  // }
}

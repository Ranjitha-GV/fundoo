import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }
  configUrl = 'http://34.213.106.173/api/user/service';
  postUrl = 'http://34.213.106.173/api';
  token = localStorage.getItem('token');
  // finalUrl = environment.baseUrl;
  getConfig() {
    return this.http.get(this.configUrl);
  }
  addData(url, body) {
    url = this.postUrl + url;
    return this.http.post(url, body);
  }

  getAddService(url) {
    url = this.postUrl + url
    return this.http.get(url);
  }
  resetPass(url, body) {
    url = this.postUrl + url;
    return this.http.post(url, body);
  }
  loginPost(url, body) {
    url = this.postUrl + url;
    return this.http.post(url, body);
  }
  resetPost(name, input, access_token) {
    console.log(input);
    console.log(access_token)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': access_token
      })
    };
    return this.http.post(this.postUrl + "/" + name, this.getFormUrlEncoded(input), httpOptions)
  }
  getFormUrlEncoded(toConvert) {
    const formBody = [];
    for (const property in toConvert) {
      const encodedKey = encodeURIComponent(property);
      const encodedValue = encodeURIComponent(toConvert[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    return formBody.join('&');
  }
  signoutPost(url, token) {
    url = this.postUrl + url;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
      })
    };
    return this.http.post(url, {}, httpOptions);
  }
  postNotes(url, body, token) {
    url = this.postUrl + url;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': token
      })
    };
    return this.http.post(url, this.getFormUrlEncoded(body), httpOptions);
  }
  getNotes(url, token) {
    url = this.postUrl + url;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
      })
    };
    return this.http.get(url, httpOptions);
  }

  deleteNotes(url, body, token) {
    url = this.postUrl + url;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
      })
    };
    return this.http.post(url, body, httpOptions);
  }
  getTrash(url, token) {
    url = this.postUrl + url;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
      })
    };
    return this.http.get(url, httpOptions);
  }
  getReminders(url,token)
  {
    url = this.postUrl + url;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': token
      })
    };
    return this.http.get(url, httpOptions);
  }
  getArchive(url, token) {
    url = this.postUrl + url;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
      })
    };
    return this.http.get(url, httpOptions);
  }
  postArchive(url, body, token) {
    url = this.postUrl + url;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
      })
    };
    return this.http.post(url, body, httpOptions);
  }
  postColor(url, body, token) {
    url = this.postUrl + url;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
      })
    };
    return this.http.post(url, body, httpOptions);
  }
  noteUpdate(url, body, token) {
    url = this.postUrl + url;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': token
      })
    };
    return this.http.post(url, this.getFormUrlEncoded(body), httpOptions)
  }
  deleteLabel(url, body) {
    url = this.postUrl + url;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': this.token
      })
    }
    return this.http.delete(url, body);
  }
  editLabel(url, body) {
    url = this.postUrl + url;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': this.token
      })
    };
    return this.http.post(url, body);
  }
  httpAddImage(url,body,token){
    console.log(token);
    url = this.postUrl + url;
    var httpOptions={
      headers:new HttpHeaders({
       
       'Authorization':token
      })
    };
    return this.http.post(url,body,httpOptions)
  }
  
        
getReminder(url,token){
  url = this.postUrl + url;
          console.log(token);
          var httpOptions={
            headers:new HttpHeaders({
             
             'Authorization':token
            })
          };
          return this.http.get(url,httpOptions)
        }

}



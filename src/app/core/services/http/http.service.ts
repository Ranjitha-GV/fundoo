import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }
  
/******************Get Url Encocded*************************** */
  getFormUrlEncoded(toConvert) {
    const formBody = [];
    for (const property in toConvert) {
      const encodedKey = encodeURIComponent(property);
      const encodedValue = encodeURIComponent(toConvert[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    return formBody.join('&');
  }
  /**********************POST API's********************************** */

  postNotes(url, body) {
    let token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        // 'Authorization': token
      })
    };
    return this.http.post(url, this.getFormUrlEncoded(body), httpOptions);
  }

  resetPost(url, input, access_token) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': access_token
      })
    };
    return this.http.post(url, this.getFormUrlEncoded(input), httpOptions)
  }

  loginPost(url, body) {
    return this.http.post(url, body);
  }

  postArchive(url, body) {
    let token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // 'Authorization': token
      })
    };
    return this.http.post(url, body, httpOptions);
  }

  image(url, body) {   
    let token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        
        // 'Authorization': token
      })
    };
    return this.http.post(url, body, httpOptions);
  }

  /**********************GET API's****************************** */
  getNotes(url) {
    let token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // 'Authorization': token
      })
    };
    return this.http.get(url, httpOptions);
  }

  getAddService(url) {
    return this.http.get(url);
  }

  getReminders(url)
  {
    let token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        // 'Authorization': token
      })
    };
    return this.http.get(url, httpOptions);
  }
  
  /*********************Delete API******************************* */

  deleteLabel(url, body) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        // 'Authorization': token
      })
    }
    return this.http.delete(url, body);     
  }
    /********************************************************* */

}



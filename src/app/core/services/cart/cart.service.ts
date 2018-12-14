import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private baseUrl = environment.baseUrl;
  private token = localStorage.getItem('token');

  constructor(private http: HttpService) { }

  addToCart(body)
  {
    let url = this.baseUrl + 'productcarts/addToCart';
    return this.http.postArchive(url, body); //getNotes
  }

  getCartDetails(cartId)
  {
    let url = this.baseUrl + 'productcarts/getCartDetails/'+ cartId;
    return this.http.getNotes(url);
  }
}

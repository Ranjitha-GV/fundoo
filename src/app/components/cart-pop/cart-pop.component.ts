import { Component, OnInit, Inject } from '@angular/core';
import { ProductCartComponent } from '../product-cart/product-cart.component';
import { DialogData } from '../update/update.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CartService } from 'src/app/core/services/cart/cart.service';
import { LoggerService } from 'src/app/core/services/logger/logger.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-pop',
  templateUrl: './cart-pop.component.html',
  styleUrls: ['./cart-pop.component.scss']
})
export class CartPopComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ProductCartComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, public cartHttpService : CartService, public router: Router) {}

  
  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  proceedToCart()
  {    
    this.cartHttpService.addToCart(
      {
        "productId": this.data.id
      })
      .subscribe((data)=>
      {
        LoggerService.log('added to cart', data);
        this.router.navigate(['/registration']);
        this.dialogRef.close();
      },
      error =>
      {
        LoggerService.log(error);
      })
  }

}

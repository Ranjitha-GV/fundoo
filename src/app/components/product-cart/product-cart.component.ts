import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/core/services/users/users.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { CartPopComponent } from '../cart-pop/cart-pop.component';
import { MatDialog } from '@angular/material';


@Component({
  selector: 'app-product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.scss']
})
export class ProductCartComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(public myHttpService : UsersService, public router: Router, public dialog: MatDialog) { }

  // private color = true;
  private records = {};
  private service;
  private cards = [];

  ngOnInit() 
  {
    this.users();
  }

  colorClick()
  {
    // this.color = false;
  }
  users() {
    this.records = this.myHttpService.userService()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        for (var i = 0; i < data["data"].data.length; i++) {
          data["data"].data[i].firstCard = true;
          data["data"].data[i].secondCard = true;
          this.cards.push(data["data"].data[i]);
        }
        console.log(this.cards);
      })
  }

  selectCards(card) {
    this.service = card.name;
    card.firstCard = false;
    for (var i = 0; i < this.cards.length; i++) {
      if (card.name == this.cards[i].name) {
        continue;
      }
      this.cards[i].firstCard = true;
    }
  }
  selectCardsTwo(card)
  {
    this.service = card.name;
    card.secondCard = false;
    for (var i = 0; i < this.cards.length; i++) {
      if (card.name == this.cards[i].name) {
        continue;
      }
      this.cards[i].secondCard = true;
    }
  }
 
  openDialog(card): void {
    const dialogRef = this.dialog.open(CartPopComponent, {
      width: '500px',
      height: 'fit-content',
      data: card
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }


  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}

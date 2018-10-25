import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-bin',
  templateUrl: './bin.component.html',
  styleUrls: ['./bin.component.css']
})
export class BinComponent implements OnInit {
  card = [];
  constructor(private myHttpService: HttpService) { }
  token = localStorage.getItem('token');
  ngOnInit() {
    this.myHttpService.getTrash('/notes/getTrashNotesList', this.token).subscribe(
      (data) => {
        console.log("GET Request is successful ", data);
        for (var i = data['data']['data'].length - 1; i >= 0; i--) {
          if (data['data']['data'][i].isDeleted == true) {
            this.card.push(data['data']['data'][i]);
          }
        }
      },
      error => {
        console.log("Error", error);
      })
  }
}



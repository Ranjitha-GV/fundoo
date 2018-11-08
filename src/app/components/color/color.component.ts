import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../../core/services/http/http.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {

  constructor(private myHttpService: HttpService) { }
  token = localStorage.getItem('token');
  colorsArray = ['#fafafa', '#ff8a80', '#ffd180', '#ffff8d', '#ccff90', '#a7ffeb', '#80d8ff', '#82b1ff', '#b388ff', '#f8bbd0', '#d7ccc8', '#cfd8dc']
  card = [];
  @Input() color;
  @Output() changeColor = new EventEmitter();
  @Output() emitColor = new EventEmitter();

  ngOnInit() {
  }

  colors(id) {
    this.emitColor.emit(id);
    if (this.color != undefined) {
      this.myHttpService.postColor('/notes/changesColorNotes',
        {
          "color": id,
          "noteIdList": [this.color.id]
        }, this.token).subscribe(
          (data) => {
            console.log("POST Request is successful ", data);
            localStorage.setItem('colorId', this.color.id);
            this.changeColor.emit({

            });
          },
          error => {
            console.log("Error", error);
          })
    }
  }
}




import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../../core/services/http/http.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss']
})
export class ColorComponent implements OnInit {

  constructor(private myHttpService: HttpService) { }
  token = localStorage.getItem('token');
  colorsArray = [[{ 'color': '#ffffff', 'name': 'White' },
  { 'color': '#f28b82', 'name': 'Red' },
  { 'color': '#fbbc04', 'name': 'Orange' },
  { 'color': '#fff475', 'name': 'Yellow' }],

  [{ 'color': '#ccff90', 'name': 'Green' },
  { 'color': '#a7ffeb', 'name': 'Teal' },
  { 'color': '#cbf0f8', 'name': 'Blue' },
  { 'color': '#aecbfa', 'name': 'Dark blue' }],

  [{ 'color': '#d7aefb', 'name': 'Purple' },
  { 'color': '#fdcfe8', 'name': 'Pink' },
  { 'color': '#e6c9a8', 'name': 'Brown' },
  { 'color': '#e8eaed', 'name': 'Gray' }]]

  card = [];
  @Input() color;
  @Output() changeColor = new EventEmitter();
  @Output() emitColor = new EventEmitter();

  ngOnInit() {
  }

  colorChange(id) {
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




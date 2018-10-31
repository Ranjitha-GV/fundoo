import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { HttpService } from '../../services/http.service';


@Component({
  selector: 'app-addnotes',
  templateUrl: './addnotes.component.html',
  styleUrls: ['./addnotes.component.css'],
  outputs: ['onNewEntryAdded']

})
export class AddnotesComponent implements OnInit {

  constructor(private myHttpService: HttpService) { }
  hide: any = 0;
  listing: any = 2;
  token = localStorage.getItem('token');
  newObject: any;
  @Output() onNewEntryAdded = new EventEmitter();
  color : any ;
  move() {
    this.hide = 1;
  }
  list()
  {
    this.listing = 3;
  }
  back() {
    this.hide = 0;
    this.myHttpService.postNotes('/notes/addNotes', {
      'title': document.getElementById('title').innerHTML,
      'description': document.getElementById('description').innerHTML,
      'labelIdList': '',
      'checklist': '',
      'isPined': 'false',
      'color': this.color
    }, this.token).subscribe(
      (data) => {
        console.log("POST Request is successful ", data);
        this.onNewEntryAdded.emit({
        })
        this.color = "#fafafa";
        this.hide = 0;
        this.listing = 2;
      },
      error => {
        console.log("Error", error);
        this.color = "#fafafa";
        this.hide = 0;
        this.listing = 2;
      })

  }
  colorsEntry(event)
  {
    console.log(event);
    this.color = event;
  }
  onKeydown(event) {
    if (event.key === "Enter") {
      console.log(event); 
    }
  }
  save = [];
  keyPress(keys)
  {
    this.save.push(keys);
    console.log(this.save);
  }
  ngOnInit() {

  }

}

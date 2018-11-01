import { Component, OnInit, EventEmitter, Output, ElementRef, ViewChild } from '@angular/core';
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
  id = localStorage.getItem('userId');
  @ViewChild('newLabel') newLabel: ElementRef;

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
  addLabel() {
    this.myHttpService.postNotes('/noteLabels', {
      "label": this.newLabel.nativeElement.innerHTML,
      "isDeleted": false,
      "userId": this.id

    }, this.token).subscribe(
      (data) => {
        console.log("POST Request is successful ", data);
        // this.delete();
        // this.dialogRef.close();

      },
      error => {
        console.log("Error", error);
        // this.dialogRef.close();
      })
  }
  colorsEntry(event)
  {
    console.log(event);
    this.color = event;
  }
  keys : any;
  onKeydown(event) {
    if (event.key === "Enter" || event.key === "letters" ) {
      console.log(event); 
      this.save.push(this.keys);
      //   "keys": "",
      // "status": true
    console.log(this.save);
    }
  }
  save = [];
  ngOnInit() {

  }

}

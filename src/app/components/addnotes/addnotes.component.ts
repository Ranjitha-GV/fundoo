import { Component, OnInit, EventEmitter, Output, ElementRef, ViewChild } from '@angular/core';
import { HttpService } from '../../core/services/http/http.service';


@Component({
  selector: 'app-addnotes',
  templateUrl: './addnotes.component.html',
  styleUrls: ['./addnotes.component.css'],
  outputs: ['onNewEntryAdded']

})
export class AddnotesComponent implements OnInit {

  constructor(private myHttpService: HttpService) { }
  hide: any = 0;
  listing = true;
  token = localStorage.getItem('token');
  id = localStorage.getItem('userId');
  @ViewChild('newLabel') newLabel: ElementRef;
  newObject: any;
  save = [];
  add = [];
  array = [];
  public i=0;
  data;
  dataArray = [];
  keys: any;
  @Output() onNewEntryAdded = new EventEmitter();
  color: any;

  move() {
    this.hide = 1;
  }
  list() {
    this.listing = !this.listing;
  }
  back() {
    this.hide = 0;
    this.color = "#fafafa";
    this.listing = !this.listing;
    this.myHttpService.postNotes('/notes/addNotes', {
      'title': document.getElementById('title').innerHTML,
      'description': document.getElementById('description').innerHTML,
      'labelIdList': JSON.stringify(this.array),
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
        this.listing = !this.listing;
        this.add = null;
      },
      error => {
        console.log("Error", error);
        this.color = "#fafafa";
        this.hide = 0;
        this.listing = !this.listing;
        this.add = null;
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
      },
      error => {
        console.log("Error", error);
      })
  }
  colorsEntry(event) {
    this.color = event;
  }
 
  onKeydown(event) {
    if (event.key === "Enter" || event.key === "letters") {
      this.save.push(this.keys);
    }
  }

  labelEvent(event) {
    if (this.add.indexOf(event) < 0) {
      this.array.push(event.id);
      this.add.push(event);
    }
    else {
      this.array.splice(this.array.indexOf(event), 1);
      this.add.splice(this.add.indexOf(event), 1);
    }
  }
  
enter(){
  this.i++;
  if(this.data!=null){
    console.log(event,"keydown");
    var obj={
      "index":this.i,
      "data":this.data
    }
    this.dataArray.push(obj);
    this.data=null
    
  }
}
ondelete(deletedObj){
  console.log("ondelete function runnig");
  for(var i=0;i<this.dataArray.length;i++){
    if(deletedObj.index==this.dataArray[i].index){
      this.dataArray.splice(i,1);
      break;
    }
  }
  console.log(this.dataArray);
}

editing(event,edited){

  if(event.code=="Enter"){
    console.log("enter pressed");
    for(var i=0;i<this.dataArray.length;i++){
      if(edited.index==this.dataArray[i].index){
        this.dataArray[i].data==edited.data
      }
    }
    console.log(this.dataArray);
    
  }
}

  ngOnInit() {

  }

}

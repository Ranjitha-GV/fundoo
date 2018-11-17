import { Component, OnInit, EventEmitter, Output, ElementRef, ViewChild } from '@angular/core';
import { HttpService } from '../../core/services/http/http.service';


@Component({
  selector: 'app-addnotes',
  templateUrl: './addnotes.component.html',
  styleUrls: ['./addnotes.component.scss'],
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
  dataArrayCheck = [];
  save = [];
  add = [];
  array = [];
  checked = false;
  public i=0;
  data;
  dataArray = [];
  status = "open";
  keys: any;
  @Output() onNewEntryAdded = new EventEmitter();
  color = "#fafafa";
  reminderArray = [];
  reminderVal;
  reminderNew;
  currentDate = new Date();
  today = new Date();
  tomorrow = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(),
   this.currentDate.getDate()+1)
/**Function to hide and show Note Division */
  move() {
    this.hide = 1;
  }
/**Function to hide and show checklist and notes */
  list() {
    this.listing = !this.listing;
  }
/**Hitting add notes API */
  back() {
    this.reminderNew = '';
    if(this.reminderVal != undefined)
    {
      this.reminderNew = this.reminderVal; 
    }
    if(this.checked == false)
    {
    this.hide = 0;
    this.listing = !this.listing;
    this.myHttpService.postNotes('/notes/addNotes', {
      'title': document.getElementById('title').innerHTML,
      'description': document.getElementById('description').innerHTML,
      'labelIdList': JSON.stringify(this.array),
      'checklist': '',
      'isPined': 'false',
      'color': this.color,
      'reminder': this.reminderNew
    }, this.token).subscribe(
      (data) => {
        this.onNewEntryAdded.emit({
        })
        this.color = "#fafafa";
        this.array = [];
        this.reminderArray = [];
        this.hide = 0;
        this.listing = !this.listing;  
        this.add = [];
  },
      error => {
        this.color = "#fafafa";
        this.reminderArray = [];
        this.array = [];
        this.hide = 0;
        this.listing = !this.listing;
        this.add = [];
      })
    }
    else
    {
      this.dataArrayCheck = [];
      for(var i=0;i<this.dataArray.length;i++){
        if(this.dataArray[i].isChecked==true){
         this.status="close"
        }
        var apiObj={
          "itemName":this.dataArray[i].data,
          "status":this.status
        }
        this.dataArrayCheck.push(apiObj);
        this.status="open"
      }

      this.myHttpService.postNotes('/notes/addNotes', {
        'title': document.getElementById('title').innerHTML,
        'labelIdList': JSON.stringify(this.array),
        'checklist': JSON.stringify(this.dataArrayCheck),
        'isPined': 'false',
        'color': this.color,
        'reminder': this.reminderNew 
      }, this.token).subscribe(
        (data) => {
          this.dataArray = [];
          this.array = [];
          this.reminderArray = [];
          this.hide = 0;
          this.checked = false;
          this.color = "#fafafa";
          this.listing = !this.listing;
          this.reminderVal = '';
          this.onNewEntryAdded.emit({
          })

        },
        error => {
          this.dataArray = [];
          this.reminderArray = [];
          this.array = [];
          this.hide = 0;
          this.color = "#fafafa";
          this.listing = !this.listing;
        })
    }
  }
/**Hitting Post Notes API */
  addLabel() {
  
    this.myHttpService.postNotes('/noteLabels', {
      "label": this.newLabel.nativeElement.innerHTML,
      "isDeleted": false,
      "userId": this.id

    }, this.token).subscribe(
      (data) => {
      },
      error => {
      })
    
}
/**Catching Color event to change color while adding notes */
  colorsEntry(event) {
    this.color = event;
  }
/**KeyDown function to enter checklist */
  onKeydown(event) {
    if (event.key === "Enter" || event.key === "letters") {
      this.save.push(this.keys);
    }
  }
/**Catching Label event */
  labelEvent(event) {
    console.log('i am event',event)
    if (this.add.indexOf(event) < 0) {
      console.log(event)
      this.array.push(event.id);
      this.add.push(event);
      
    }
    else {
      this.array.splice(this.array.indexOf(event), 1);
      this.add.splice(this.add.indexOf(event), 1);
    }
  }
/**Enter functionality */
enter(){
  this.i++;
  if(this.data!=null){
    var obj={
      "index":this.i,
      "data":this.data
    }
    this.dataArray.push(obj);
    this.data=null;
  }
}
/**Deleting input from the checklist field  */
ondelete(deletedObj){
  for(var i=0;i<this.dataArray.length;i++){
    if(deletedObj.index==this.dataArray[i].index){
      this.dataArray.splice(i,1);
      break;
    }
  }
}
/**Editing checklist content */
editing(event,edited){

  if(event.code=="Enter"){
    for(var i=0;i<this.dataArray.length;i++){
      if(edited.index==this.dataArray[i].index){
        this.dataArray[i].data==edited.data
      }
    }    
  }
}
/**Catching reminder entry event */
reminderEntry(event)
{
    this.reminderVal = event;
    this.reminderArray.push(event);
}
note ={
  'id':''
}
/**Removing reminders from the addnotes division */
reminderDelete(note) {
  this.reminderArray.pop();
  this.reminderVal = '';
  this.reminderNew = '';
}
/**Removing labels from the addnotes division */
remove()
{
  this.add.pop();
  this.array.pop();

}
  ngOnInit() {

  }
  
}

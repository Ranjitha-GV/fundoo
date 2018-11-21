import { Component, OnInit, EventEmitter, Output, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { UsersService } from 'src/app/core/services/users/users.service';
import { NotesServiceService } from 'src/app/core/services/notes/notes-service.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-addnotes',
  templateUrl: './addnotes.component.html',
  styleUrls: ['./addnotes.component.scss'],
  outputs: ['onNewEntryAdded']

})
export class AddnotesComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(public myHttpService: UsersService, public httpService: NotesServiceService) { }
  private hide = 0;
  private listing = true;   
  private id = localStorage.getItem('userId');
  private dataArrayCheck = [];
  private save = [];
  private add = [];
  private array = [];
  private checked = false;
  private i = 0;
  private data;
  private dataArray = [];
  private status = "open";
  private keys;
  private color = "#fafafa";
  private reminderArray = [];
  private reminderVal;
  private reminderNew;
  private currentDate = new Date();
  private today = new Date();
  private tomorrow = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(),
   this.currentDate.getDate()+1)
  @ViewChild('newLabel') newLabel: ElementRef;
  @Output() modelEmit = new EventEmitter();
  @Output() onNewEntryAdded = new EventEmitter();
  
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
    this.httpService.addNotes({
      'title': document.getElementById('title').innerHTML,
      'description': document.getElementById('description').innerHTML,
      'labelIdList': JSON.stringify(this.array),
      'checklist': '',
      'isPined': 'false',
      'color': this.color,
      'reminder': this.reminderNew
    })
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      (data) => {
        this.modelEmit.emit(data['status'].details);
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

      this.httpService.addNotes({
        'title': document.getElementById('title').innerHTML,
        'labelIdList': JSON.stringify(this.array),
        'checklist': JSON.stringify(this.dataArrayCheck),
        'isPined': 'false',
        'color': this.color,
        'reminder': this.reminderNew 
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe(
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
  
    this.httpService.addLabels({
      "label": this.newLabel.nativeElement.innerHTML,
      "isDeleted": false,
      "userId": this.id

    })
    .pipe(takeUntil(this.destroy$))
    .subscribe(
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
    if (this.add.indexOf(event) < 0) {
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
ngOnDestroy() {
  this.destroy$.next(true);
  // Now let's also unsubscribe from the subject itself:
  this.destroy$.unsubscribe();
}
  ngOnInit() {

  }
  
}

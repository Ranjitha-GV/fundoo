import { Component, OnInit, Input, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MainnotesComponent } from '../mainnotes/mainnotes.component';
import { HttpService } from '../../core/services/http/http.service';
import { LoggerService } from '../../core/services/logger/logger.service';

export interface DialogData {
  title: string;
  description: string;
  id: string;
  label: string;
}

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})

export class UpdateComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<MainnotesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private myHttpService: HttpService) { }

  token = localStorage.getItem('token');
  @Input() notedetails;
  @Input() label;
  @Output() emitEvent = new EventEmitter();
  public checklist =  false;
  public modifiedCheckList;
  tempArray = [];
  public adding=false;
  public addCheck=false;
  public status="open";
  public newList;
  public newData;

  onNoClick(): void {
    if(this.checklist==false){
      LoggerService.log('i am in update');
    this.myHttpService.noteUpdate('/notes/updateNotes', {
      "noteId": [this.data.id],
      "title": document.getElementById('titleId').innerHTML,
      "description": document.getElementById('descriptionId').innerHTML

    }, this.token).subscribe(data => {
      this.dialogRef.close();
    },
  error => {
  })
  this.dialogRef.close();
}
else{
      var apiData={
        "itemName": this.modifiedCheckList.itemName,
        "status":this.modifiedCheckList.status
    }
    var url = "/notes/" +this.data['id']+ "/checklist/" + this.modifiedCheckList.id + "/update";
    this.myHttpService.postColor(url, JSON.stringify(apiData), this.token).subscribe(response => {
      this.dialogRef.close();

    },
    error => {
    })
  }
}
  public removedList;
  removeList(checklist){
    this.removedList=checklist;
    this.removeCheckList()
  }
  removeCheckList(){
    var url = "/notes/" + this.data['id']+ "/checklist/" + this.removedList.id + "/remove";

    this.myHttpService.postColor(url,null,this.token).subscribe((response)=>{
      for(var i=0;i<this.tempArray.length;i++){
        if(this.tempArray[i].id==this.removedList.id){
          this.tempArray.splice(i,1)
        }
      }
    })
  }

  addList(event){
    if(this.newList!=""){
      this.adding = true;
    }
   else{
      this.adding = false;
   }
    if (event.code == "Enter") {
      if(this.addCheck==true){
        this.status="close";
      }
      else{
        this.status="open"
      }
      this.newData={
        "itemName":this.newList,
        "status":this.status
      }
  var url = "/notes/" + this.data['id'] + "/checklist/add";

    this.myHttpService.postColor(url, this.newData, this.token)
    .subscribe(response => {
      console.log(response);
      this.newList=null;
      this.addCheck=false;
      this.adding=false;
      console.log(response['data'].details);
      
      this.tempArray.push(response['data'].details)
    })
  }
  }
  editing(edited,event){
      
    console.log(edited);
    if(event.code=="Enter"){
    this.modifiedCheckList=edited;
    this.onNoClick();
    }
    
  }

  remove(label) {
    this.myHttpService.postNotes('/notes/' + this.data.id + '/addLabelToNotes/' + label + '/remove',
      {
        "noteId": this.data.id,
        "lableId": label
      },
      this.token).subscribe(
        (data) => {
          console.log("POST Request is successful ", data);
        },
        error => {
          console.log("Error", error);
        })
  }
  checkBox(checkList){
    
    if (checkList.status=="open"){
      checkList.status = "close"
    }
    else{
      checkList.status = "open"
    }
    console.log(checkList);
    this.modifiedCheckList=checkList;
    this.onNoClick();
  }
  reminderDelete(note) {
    var id = note.id;
    LoggerService.log('reminder note id is', id);
    this.myHttpService.postArchive('/notes/removeReminderNotes',
      {
        "noteIdList": [id]   
      },
      this.token).subscribe( 
        (data) => {
        },
        error => {
        })
  }

  ngOnInit() {
    if (this.data['noteCheckLists'].length>0){
      this.checklist=true;
    }
    this.tempArray=this.data['noteCheckLists']


  }

}
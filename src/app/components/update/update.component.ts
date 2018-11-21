import { Component, OnInit, Input, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MainnotesComponent } from '../mainnotes/mainnotes.component';
import { LoggerService } from '../../core/services/logger/logger.service';
import { NotesServiceService } from 'src/app/core/services/notes/notes-service.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

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
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(public dialogRef: MatDialogRef<MainnotesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, 
     public httpService: NotesServiceService) { }

  
  private checklist =  false;
  private modifiedCheckList;
  private tempArray = [];
  private adding=false;
  private addCheck=false;
  public status="open";
  private newList;
  private newData;
  private color = '#fafafa';
  @Input() notedetails;
  @Input() label;
  @Output() emitEvent = new EventEmitter();

  onNoClick(): void {
    if(this.checklist==false ){
    this.httpService.updateNotes({
      "noteId": [this.data.id],
      "title": document.getElementById('titleId').innerHTML,
      "description": document.getElementById('descriptionId').innerHTML,

    })
    .pipe(takeUntil(this.destroy$))  
    .subscribe(data => {
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
    if(this.modifiedCheckList!=undefined)
    {
    this.httpService.updateChecklist(this.data['id'], this.modifiedCheckList.id, 
     JSON.stringify(apiData))
     .pipe(takeUntil(this.destroy$))  
     .subscribe(response => {
      this.dialogRef.close();

    },
    error => {
    })
  }
}
}
  public removedList;
  removeList(checklist){
    this.removedList=checklist;
    this.removeCheckList()
  }
  removeCheckList(){
    this.httpService.removeCheckList(this.data['id'], this.removedList.id, {})
    .pipe(takeUntil(this.destroy$))  
    .subscribe((response)=>{
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

    this.httpService.addCheckListUpdate(this.data['id'], this.newData)
    .pipe(takeUntil(this.destroy$))  
    .subscribe(response => {
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
    this.httpService.removeLabelsNotes(this.data.id, label,
      {
        "noteId": this.data.id,
        "lableId": label
      })
      .pipe(takeUntil(this.destroy$))  
      .subscribe(
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
    this.httpService.deleteReminder(
      {
        "noteIdList": [id]   
      })
      .pipe(takeUntil(this.destroy$))  
      .subscribe( 
        (data) => {
        },
        error => {
        })
  }
  colorsEntry(event) {
    this.color = event;
  }

  ngOnInit() {
    this.color = this.data['color'];
    if (this.data['noteCheckLists'].length>0){
      this.checklist=true;
    }
    this.tempArray=this.data['noteCheckLists']

  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }

}
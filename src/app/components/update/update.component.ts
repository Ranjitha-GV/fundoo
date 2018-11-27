import { Component, OnInit, Input, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { MainnotesComponent } from '../mainnotes/mainnotes.component';
import { LoggerService } from '../../core/services/logger/logger.service';
import { NotesServiceService } from 'src/app/core/services/notes/notes-service.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { CollaberatorComponent } from '../collaberator/collaberator.component';

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

  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<MainnotesComponent>,
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
/**Hitting API to update notes */
  onNoClick(): void {
    if(this.checklist == false ){
    this.httpService.updateNotes({
      "noteId": [this.data.id],
      "title": document.getElementById('titleId').innerHTML,
      "description": document.getElementById('descriptionId').innerHTML,

    })
    .pipe(takeUntil(this.destroy$))  
    .subscribe(data => {
      console.log(data);
      this.dialogRef.close();
    },
  error => {
    console.log(error);

  })
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
/**Hitting API to remove checklist */
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
/**Hitting API to add checklist */
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
/**Function to edit checklist */
  editing(edited,event){
      
    if(event.code=="Enter"){
    this.modifiedCheckList=edited;
    this.onNoClick();
    }
  }
/**Hitting API to remove labels */
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
/**Checkbox strike and no strike function */
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
/**Hitting API to delete reminder */
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
/**Change color event */
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
/**Function to open collaborator pop up */
  open(note): void {
    const dialogRef = this.dialog.open(CollaberatorComponent, {
      width: '550px',
      height: 'auto',
      data: note
    });

    dialogRef.afterClosed()
    .pipe(takeUntil(this.destroy$))
    .subscribe(result => {

    });
    this.dialogRef.close();
  }
/**Function to close dialog box */
close()
  {
    this.dialogRef.close();
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }

}
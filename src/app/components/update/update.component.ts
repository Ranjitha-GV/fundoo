import { Component, OnInit, Input, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MainnotesComponent } from '../mainnotes/mainnotes.component';
import { HttpService } from '../../core/services/http/http.service';

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
  public checklist =  false;
  public modifiedCheckList;
  tempArray = [];

  onNoClick(): void {
    if(this.checklist==false){
    this.myHttpService.postColor('/notes/updateNotes', {
      "noteId": [this.data.id],
      "title": document.getElementById('titleId').innerHTML,
      "description": document.getElementById('descriptionId').innerHTML

    }, this.token).subscribe(data => {
      console.log('response', data);
      this.dialogRef.close();
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
      console.log(response);
      // this.archiveEvent.emit();

    })
    }
    error => {
      console.log(error);
    }
  }
  public removedList;
  removeList(checklist){
    console.log(checklist)
    this.removedList=checklist;
    this.removeCheckList()
  }
  removeCheckList(){
    var url = "/notes/" + this.data['id']+ "/checklist/" + this.removedList.id + "/remove";

    this.myHttpService.postColor(url,null,this.token).subscribe((response)=>{
      console.log(response);
      for(var i=0;i<this.tempArray.length;i++){
        if(this.tempArray[i].id==this.removedList.id){
          this.tempArray.splice(i,1)
        }
      }
    })
  }
  public adding=false;
  public addCheck=false;
  public status="open";
  public newList;
  public newData;

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

      console.log(this.tempArray)

    })
  }
  }
  editing(editedList,event){
      
    console.log(editedList);
    if(event.code=="Enter"){
    this.modifiedCheckList=editedList;
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

  ngOnInit() {
    if (this.data['noteCheckLists'].length>0){
      this.checklist=true;
    }
    this.tempArray=this.data['noteCheckLists']


  }

}
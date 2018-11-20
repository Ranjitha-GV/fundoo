import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FundooNotesComponent } from '../fundoo-notes/fundoo-notes.component';
import { MatDialog, MatDialogRef } from '@angular/material';
import { SearchService } from '../../core/services/data/search.service';
import { LabelpopComponent } from '../labelpop/labelpop.component';
import { NotesServiceService } from 'src/app/core/services/notes/notes-service.service';



@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class LabelComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<FundooNotesComponent>, public data: SearchService, 
    public dialog : MatDialog, public httpService: NotesServiceService) { }

  private show;
  private value1 = [];
  id = localStorage.getItem('userId')
  @ViewChild('newLabel') newLabel: ElementRef;
  @ViewChild('myLabel') myLabel: ElementRef;
  
  onNoClick(): void {
  }

  openDialog(note): void {
    const dialogRef = this.dialog.open(LabelpopComponent, {
    width: 'fit-content',
    height:'fit-content'
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if(result)
      {      
        this.httpService.deleteNoteLabels(note, {
          "label": this.newLabel.nativeElement.innerHTML
        }).subscribe(
          (response) => {
            console.log(response);            
            this.data.changeChipEvent(true);
            this.delete();
          },
          error => {
            console.log(error);

          })
        }
    });
  }
  
  ngOnInit() {
    this.delete();
    // this.addLabel();
  }

  addLabel() {
    var label = this.newLabel.nativeElement.innerHTML
    for (var i = 0; i < this.value1.length; i++) {
      if (this.value1[i].label == label) {
        alert('duplicate data');
        return false;
      }
    }
    this.httpService.addLabels({
      "label": this.newLabel.nativeElement.innerHTML,
      "isDeleted": false,
      "userId": this.id

    }).subscribe(
      (data) => {
        this.delete();
        this.dialogRef.close();

      },
      error => {
      })
  }

  labelDelete(val) {
    this.openDialog(val);
  }

  delete() {
    let tempArr = [];
    this.httpService.getLabels().subscribe(
      (data) => {
        for (var i = 0; i < data['data']['details'].length; i++) {
          if (data['data']['details'][i].isDeleted == false) {
            tempArr.push(data['data']['details'][i])
          }
        }
        this.value1 = tempArr;
      },
      error => {
      })
  }
  edit(val) {
    this.httpService.editLabel(val,{
        "label": this.myLabel.nativeElement.innerHTML,
        "isDeleted": false,
        "id": val,
        "userId": localStorage.getItem('userId')
      }).subscribe(
        (data) => {
          this.delete();
        },
        error => {
        })
  }
  edit2(id) {
    this.show = id;
  }

  close() {
    this.newLabel.nativeElement.innerHTML = ' ';
  }
}

import { Component, OnInit, Inject, Input, ElementRef, ViewChild } from '@angular/core';
import { FundooNotesComponent } from '../fundoo-notes/fundoo-notes.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpService } from '../../core/services/http/http.service';
import { NullAstVisitor } from '@angular/compiler';
import { SearchService } from '../../core/services/data/search.service';
import { LabelpopComponent } from '../labelpop/labelpop.component';



@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class LabelComponent implements OnInit {

  constructor(private myHttpService: HttpService, public dialogRef:
    MatDialogRef<FundooNotesComponent>, public data: SearchService, public dialog : MatDialog) { }

  public show;
  value1: any = [];
  @ViewChild('newLabel') newLabel: ElementRef;
  @ViewChild('myLabel') myLabel: ElementRef;
  clear: any;
  res: string;
  id = localStorage.getItem('userId')
  token = localStorage.getItem('token');

  onNoClick(): void {
  }

  openDialog(note): void {
    const dialogRef = this.dialog.open(LabelpopComponent, {
    width: 'fit-content',
    height:'fit-content'
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if(result == true)
      {      
        this.myHttpService.deleteLabel('/noteLabels/' + note + '/deleteNoteLabel', {
          "label": this.newLabel.nativeElement.innerHTML
        }).subscribe(
          (data) => {
            this.data.changeChipEvent(true);
            this.delete();
          },
          error => {
          })
        }
    });
  }
  
  ngOnInit() {
    this.delete();
    this.addLabel();
  }

  addLabel() {
    var label = this.newLabel.nativeElement.innerHTML
    for (var i = 0; i < this.value1.length; i++) {
      if (this.value1[i].label == label) {
        alert('duplicate data');
        return false;
      }
    }
    this.myHttpService.postNotes('/noteLabels', {
      "label": this.newLabel.nativeElement.innerHTML,
      "isDeleted": false,
      "userId": this.id

    }, this.token).subscribe(
      (data) => {
        this.delete();
        this.dialogRef.close();

      },
      error => {
        // this.dialogRef.close();
      })
  }

  labelDelete(val) {
    this.openDialog(val);
  }

  delete() {
    let tempArr = [];
    this.myHttpService.getNotes('/noteLabels/getNoteLabelList', this.token).subscribe(
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
    this.myHttpService.postNotes('/noteLabels/' + val + '/updateNoteLabel',
      {
        "label": this.myLabel.nativeElement.innerHTML,
        "isDeleted": false,
        "id": val,
        "userId": localStorage.getItem('userId')
      },
      this.token).subscribe(
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

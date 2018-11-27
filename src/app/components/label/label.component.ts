import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { FundooNotesComponent } from '../fundoo-notes/fundoo-notes.component';
import { MatDialog, MatDialogRef } from '@angular/material';
import { SearchService } from '../../core/services/data/search.service';
import { LabelpopComponent } from '../labelpop/labelpop.component';
import { NotesServiceService } from 'src/app/core/services/notes/notes-service.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Labels } from 'src/app/core/model/labels';



@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class LabelComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(public dialogRef: MatDialogRef<FundooNotesComponent>, public data: SearchService, 
    public dialog : MatDialog, public httpService: NotesServiceService) { }

  private show;
  private value1 = [];
  id = localStorage.getItem('userId')
  @ViewChild('newLabel') newLabel: ElementRef;
  @ViewChild('myLabel') myLabel: ElementRef;
  
  onNoClick(): void {
  }
/**Open Label popup*/
  openDialog(note): void {
    const dialogRef = this.dialog.open(LabelpopComponent, {
    width: 'fit-content',
    height:'fit-content'
    });
    
    dialogRef.afterClosed()
    .pipe(takeUntil(this.destroy$))
    .subscribe(result => {
      if(result)
      {      
        this.httpService.deleteNoteLabels(note, {
          "label": this.newLabel.nativeElement.innerHTML
        })
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (response) => {
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
/**Hitting add label API */
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

    })
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      (data) => {
        this.delete();
        this.dialogRef.close();

      },
      error => {
      })
  }
/**Hitting label delete component */
  labelDelete(val) {
    this.openDialog(val);
  }
/**Get notes after delete */
  delete() {
    let tempArr: Labels[] = [];
    this.httpService.getLabels()
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      (data) => {
        var response : Labels[] = [] = data['data']['details'];
        for (var i = 0; i < response.length; i++) {
          if (response[i].isDeleted == false) {
            tempArr.push(response[i]);
          }
        }
        this.value1 = tempArr;
      },
      error => {
      })
  }
/**Hitting API to edit label */
  edit(val) {
    this.httpService.editLabel(val,{
        "label": this.myLabel.nativeElement.innerHTML,
        "isDeleted": false,
        "id": val,
        "userId": localStorage.getItem('userId')
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data) => {
          this.delete();
        },
        error => {
        })
  }
/**Show and hide division */
  edit2(id) {
    this.show = id;
  }
/**Function to close popup component */
  close() {
    this.newLabel.nativeElement.innerHTML = ' ';
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}

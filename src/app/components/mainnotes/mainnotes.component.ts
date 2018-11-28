import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { UpdateComponent } from '../update/update.component';
import { SearchService } from '../../core/services/data/search.service';
import { LoggerService } from '../../core/services/logger/logger.service';
import { Router } from '@angular/router';
import { NotesServiceService } from 'src/app/core/services/notes/notes-service.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { CollaberatorComponent } from '../collaberator/collaberator.component';


@Component({
  selector: 'app-mainnotes',
  templateUrl: './mainnotes.component.html',
  styleUrls: ['./mainnotes.component.scss']
})

export class MainnotesComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(public dialog: MatDialog, public data: SearchService, 
     public router : Router, public httpService: NotesServiceService) {
    this.data.currentChipEvent
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      message => {
        if (message) {
          this.addEntry.emit({
          })
        }
      })
  }
  private array = [];
  private modifiedList;
  private noteCard = [];
  private toggle = true;
  private show = 0;
  private currentDate = new Date();
  private today = new Date();
  private tomorrow = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(),
   this.currentDate.getDate()+1);
  private owner = this.data['user'];
  @ViewChild('title') title: ElementRef;
  @ViewChild('description') description: ElementRef;
  @Input() searchElement;
  @Input() notesArray;
  @Input() length;
  @Input() string;
  @Output() addEntry = new EventEmitter();
  
  ngOnInit() {
    this.getlabels();
    this.gridList();
    this.question();
  }
/**To check if the reminder time is greater than */
  remind(time)
  {
    var currentReminder = new Date().getTime();
    var val = new Date(time).getTime();
    if(val > currentReminder)
    {
      return true;
    }
    else
    {
      return false;
    }
  }
/**Event emitter to Notes component */
  nextEntry(event) {
    if (event) {
      this.addEntry.emit({

      })
    }
  }
/**Data service to change grid and list view */
  gridList() {
    this.data.currentGridEvent
    .pipe(takeUntil(this.destroy$))
    .subscribe(message => {
      this.toggle = message;
    })
  }
/**Dialog box for update component */
  openUpdateNotes(note): void {
    const dialogRef = this.dialog.open(UpdateComponent, {
      width: '800',
      height: 'fit-content',
      data: note
    });

    dialogRef.afterClosed()
    .pipe(takeUntil(this.destroy$))
    .subscribe(result => {
      console.log(this.title.nativeElement.innerHTML);
      
      this.httpService.updateNotes({
        "noteId": [note.id],
        "title": this.title.nativeElement.innerHTML,
        "description": this.description.nativeElement.innerHTML,
  
      })
      .pipe(takeUntil(this.destroy$))  
      .subscribe(data => {
        console.log('i am data', data); 
      },
    error => {
      console.log('i am error', error);
    })
      this.addEntry.emit({});
    });
  }
/**Dialog box to open collaborator pop up*/
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
    }
/**Hitting API to remove labels*/
  remove(label, note) {
    this.httpService.removeLabelsNotes(note, label,
      {
        "noteId": note,
        "lableId": label
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data) => {
          this.addEntry.emit({});
        },    
        error => {
        })
  }
/**Hitting API to get labels */
  getlabels() {
    this.httpService.getLabels()
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      (data) => {
        var value1 = [];
        for (var i = 0; i < data['data']['details'].length; i++) {
          if (data['data']['details'][i].isDeleted == false) {
            value1.push(data['data']['details'][i])
          }
        }
        this.addEntry.emit({
        })
      },
      error => {
      })
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
          this.addEntry.emit({});
        },
        error => {
        })
  }
/**Hitting API to update checklist notes */
  update(id) {
    var apiData = {
      "itemName": this.modifiedList.itemName,
      "status": this.modifiedList.status
    }
    this.httpService.updateChecklist(id, this.modifiedList.id,JSON.stringify(apiData))
    .pipe(takeUntil(this.destroy$))
    .subscribe(response => {

    })
  }
/**Checklist strike and no strike status */
  checkBox(checkList, note) {

    if (checkList.status == "open") {
      checkList.status = "close"
    }
    else {
      checkList.status = "open"
    }
    this.modifiedList = checkList;
    this.update(note.id);

  }
/**Navigate to particular label page when clicked on */
  labelNav(labelsList)
  {
    LoggerService.log(labelsList);
    this.router.navigate(['/home/newlabel/' + labelsList]);
 }

 question()
 {
   
 }

 ngOnDestroy() {
  this.destroy$.next(true);
  // Now let's also unsubscribe from the subject itself:
  this.destroy$.unsubscribe();
}
}
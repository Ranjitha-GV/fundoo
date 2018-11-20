import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { UpdateComponent } from '../update/update.component';
import { SearchService } from '../../core/services/data/search.service';
import { LoggerService } from '../../core/services/logger/logger.service';
import { Router } from '@angular/router';
import { NotesServiceService } from 'src/app/core/services/notes/notes-service.service';


@Component({
  selector: 'app-mainnotes',
  templateUrl: './mainnotes.component.html',
  styleUrls: ['./mainnotes.component.scss']
})
export class MainnotesComponent implements OnInit {

  constructor(public dialog: MatDialog, public data: SearchService, 
     public router : Router, public httpService: NotesServiceService) {
    this.data.currentChipEvent.subscribe(
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
   this.currentDate.getDate()+1)
  @Input() searchElement;
  @Input() notesArray;
  @Input() length;
  @Input() string;
  @Output() addEntry = new EventEmitter();
  
  ngOnInit() {
    this.getlabels();
    this.gridList();
  }
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

  nextEntry(event) {
    if (event) {
      this.addEntry.emit({

      })
    }
  }

  gridList() {
    this.data.currentGridEvent.subscribe(message => {
      this.toggle = message;
    })
  }

  openUpdateNotes(note): void {
    const dialogRef = this.dialog.open(UpdateComponent, {
      width: '800',
      height: 'fit-content',
      data: note
    });

    dialogRef.afterClosed().subscribe(result => {
      this.addEntry.emit({});
    });
  }

  remove(label, note) {
    this.httpService.removeLabelsNotes(note, label,
      {
        "noteId": note,
        "lableId": label
      }).subscribe(
        (data) => {
          this.addEntry.emit({});
        },
        error => {
        })
  }

  getlabels() {
    this.httpService.getLabels().subscribe(
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
  reminderDelete(note) {
    var id = note.id;
    this.httpService.deleteReminder(
      {
        "noteIdList": [id]
      }).subscribe(
        (data) => {
          this.addEntry.emit({});
        },
        error => {
        })
  }
  update(id) {
    var apiData = {
      "itemName": this.modifiedList.itemName,
      "status": this.modifiedList.status
    }
    this.httpService.updateChecklist(id, this.modifiedList.id,JSON.stringify(apiData))
    .subscribe(response => {

    })
  }
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
  labelNav(labelsList)
  {
    LoggerService.log(labelsList);
    this.router.navigate(['/home/newlabel/' + labelsList]);
 }
}
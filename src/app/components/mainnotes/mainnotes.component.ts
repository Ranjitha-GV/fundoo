import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { MatDialog } from '@angular/material';
import { UpdateComponent } from '../update/update.component';


@Component({
  selector: 'app-mainnotes',
  templateUrl: './mainnotes.component.html',
  styleUrls: ['./mainnotes.component.css']
})
export class MainnotesComponent implements OnInit {

  constructor(private myHttpService: HttpService, public dialog: MatDialog) { }
  array: any = [];
  token = localStorage.getItem('token');
  noteCard : any = [];
  response : any;
  interval : any;
  @Input() notesArray;
  @Output() addEntry = new EventEmitter();
  ngOnInit() {
    this.getlabels();
  }
  nextEntry(event)
  {
    if(event)
    {
      this.addEntry.emit({

      })
    }
  }

  openUpdateNotes(note): void {
    const dialogRef = this.dialog.open(UpdateComponent, {
      width: '800',
      height : 'fit-content',
      data: note
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.addEntry.emit({});
      // this.animal = result;
    });
  }
  remove(label, note)
  {
    this.myHttpService.postNotes('/notes/'+ note +'/addLabelToNotes/' + label + '/remove',
    {
      "noteId" : note,
      "lableId" : label
    },
     this.token).subscribe(
      (data) => {
        console.log("POST Request is successful ", data);
        this.addEntry.emit({});

      },
      error => {
        console.log("Error", error);
      })
  }
  
  getlabels()
  {
    this.myHttpService.getNotes('/noteLabels/getNoteLabelList', this.token).subscribe(
      (data) => {
        var value1 = [];
        console.log("GET Request is successful ", data);
        for (var i = 0; i < data['data']['details'].length; i++) {
          if (data['data']['details'][i].isDeleted == false) {
            value1.push(data['data']['details'][i])
          }
        }
        console.log(value1);
        var noteLabels = value1;
        console.log("I am notelabels",noteLabels);
      },
      error => {
        console.log("Error", error);
      })
  }

}

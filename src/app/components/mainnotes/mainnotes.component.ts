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


}

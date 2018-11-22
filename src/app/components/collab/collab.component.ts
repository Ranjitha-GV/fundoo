import { Component, OnInit, Input } from '@angular/core';
import { CollaberatorComponent } from '../collaberator/collaberator.component';
import { MatDialog } from '@angular/material';
import { LoggerService } from 'src/app/core/services/logger/logger.service';

@Component({
  selector: 'app-collab',
  templateUrl: './collab.component.html',
  styleUrls: ['./collab.component.scss']
})

export class CollabComponent implements OnInit {

  @Input() collab;
  constructor(public dialog: MatDialog) { }
  
  ngOnInit() {
  }

  openCollab(): void {
    LoggerService.log(this.collab);
      const dialogRef = this.dialog.open(CollaberatorComponent, {
        width: '550px',
        height: 'auto',
        data: this.collab
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
  
      });
    }
}

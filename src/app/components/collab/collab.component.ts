import { Component, OnInit, Input } from '@angular/core';
import { CollaberatorComponent } from '../collaberator/collaberator.component';
import { MatDialog } from '@angular/material';
import { LoggerService } from 'src/app/core/services/logger/logger.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-collab',
  templateUrl: './collab.component.html',
  styleUrls: ['./collab.component.scss']
})

export class CollabComponent implements OnInit {

  @Input() collab;
  constructor(public dialog: MatDialog) { }
  destroy$: Subject<boolean> = new Subject<boolean>();

  ngOnInit() {
  }
  /**Function to collaborator dialog*/
  openCollab(): void {
    LoggerService.log(this.collab);
      const dialogRef = this.dialog.open(CollaberatorComponent, {
        width: '550px',
        height: 'auto',
        data: this.collab
      });
  
      dialogRef.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
  
      });
    }

    ngOnDestroy() {
      this.destroy$.next(true);
      // Now let's also unsubscribe from the subject itself:
      this.destroy$.unsubscribe();
    }
}

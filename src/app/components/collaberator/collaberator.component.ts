import { Component, OnInit, Inject, Input } from '@angular/core';
import { DialogData, UpdateComponent } from '../update/update.component';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { environment } from 'src/environments/environment.prod';
import { LoggerService } from 'src/app/core/services/logger/logger.service';
import { NotesServiceService } from 'src/app/core/services/notes/notes-service.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { UsersService } from 'src/app/core/services/users/users.service';

export interface DialogData {
  
}

@Component({
  selector: 'app-collaberator',
  templateUrl: './collaberator.component.html',
  styleUrls: ['./collaberator.component.scss']
})

export class CollaberatorComponent implements OnInit {

  constructor(public httpService: NotesServiceService, public myHttpService: UsersService, public dialog: MatDialog, public dialogRef: MatDialogRef<CollaberatorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }
    destroy$: Subject<boolean> = new Subject<boolean>();

    private image = localStorage.getItem('imageUrl');
    private firstname = localStorage.getItem('firstname');
    private lastname = localStorage.getItem('lastname');
    private email = localStorage.getItem('email');
    private img = environment.apiUrl + this.image;
    private values;
    private searchword;
    
  ngOnInit() {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  addCollab()
  {
    this.httpService.addCollabNotes(this.data.id,
      {
        'title' : this.data.title
      })
    .pipe(takeUntil(this.destroy$))
    .subscribe((data)=>
    {
      LoggerService.log(data);
      this.dialogRef.close();
    },
    error =>
    {
      this.dialogRef.close();
    })
  }
  openDialog()
  {
    this.dialogRef.close();
    const dialogRef = this.dialog.open(UpdateComponent, {
      data: this.data
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  onKey(event)
  {
    this.values = event;
    LoggerService.log(this.values);
    this.myHttpService.searchName({
      'searchWord': this.searchword
    })
    .pipe(takeUntil(this.destroy$))
    .subscribe((data)=>
    {
      LoggerService.log(data);
    },
    error =>
    {
      LoggerService.log(error);
    })
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}

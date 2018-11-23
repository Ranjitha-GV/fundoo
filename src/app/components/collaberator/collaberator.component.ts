import { Component, OnInit, Inject, Input, ViewChild, ElementRef } from '@angular/core';
import { DialogData, UpdateComponent } from '../update/update.component';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatMenu } from '@angular/material';
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

  constructor(public httpService: NotesServiceService, public myHttpService: UsersService, 
    public dialog: MatDialog, public dialogRef: MatDialogRef<CollaberatorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }
    destroy$: Subject<boolean> = new Subject<boolean>();

    private image = localStorage.getItem('imageUrl');
    private firstname = localStorage.getItem('firstname');
    private lastname = localStorage.getItem('lastname');
    private userId = localStorage.getItem('userId');
    private email = localStorage.getItem('email');
    private img = environment.apiUrl + this.image;
    private values;
    private searchword;
    private newEmail = 'Person or email to share with';
    private usersList = [];
    private newList = [];
    
  ngOnInit() {

  }
//   @ViewChild('menu')
// set menu(value: MatMenu)  {
//   this.menuItems[1].elementRef = value;
// }
// select(users :string)
//   {
//     this.selected = users;
//   }
//   selected :string;
// menuItems: Array<{text: string, elementRef: MatMenu}> = [
//     {text: "users", elementRef: null },
//     {text: "Tabledriven.Item2", elementRef: null},
//   ];

  onNoClick(): void {
    this.dialogRef.close();
  }
  addCollab(users)
  {
    console.log(users);
    this.httpService.addCollabNotes(this.data.id,
      {
        'firstName' : users.firstName,
        'lastName' : users.lastName,
        'email' : users.email,
        'userId' : users.userId
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
      LoggerService.log(data['data']['details']);
      this.usersList = data['data']['details'];
    },
    error =>
    {
      LoggerService.log(error);
    })
  }
  select(users)
  {
    this.searchword = users;
    console.log(this.searchword);
    
  }
  enterNewLine(user)
  {
    console.log(user);
    for(let i = 0; i < this.usersList.length; i++)
    {
      if(this.usersList[i].email == user)
      {
        this.newList = this.usersList[i];
      }
    }
    console.log(this.newList);
  }
  save()
  {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}

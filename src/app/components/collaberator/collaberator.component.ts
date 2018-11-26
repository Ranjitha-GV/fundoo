import { Component, OnInit, Inject, Input } from '@angular/core';
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

    private owner = this.data['user'];
    private image = localStorage.getItem('imageUrl');
    private firstname = localStorage.getItem('firstname');
    private lastname = localStorage.getItem('lastname');
    private userId = localStorage.getItem('userId');
    private email = localStorage.getItem('email');
    private img = environment.apiUrl + this.owner.imageUrl;
    private values;
    private searchword;
    private newEmail = 'Person or email to share with';
    private usersList = [];
    private newList = [];
    
  ngOnInit() {
    this.collabList();
  }
/**Function to display the list of users the note has been shared with */
  collabList()
  {
    for(let j = 0; j < this.data['collaborators'].length; j++)
    {      
      this.newList = this.data['collaborators'];
    }
  }
  /**Hitting RemoveCollaborators API */
  close(index)
  {
    this.httpService.removeCollabNotes(this.data.id, index.userId
    )
    .pipe(takeUntil(this.destroy$))  
    .subscribe((data)=>
    {
      LoggerService.log('data',data);
      for(let k = 0; k < this.newList.length; k++)
      {
      this.newList.splice(k,1);
      }
    },
    error=>
    {
      LoggerService.log('error',error)
    })
  }
  
  /**Hitting AddCollaborators API */
  addCollab(users)
  {
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
  /**Function to open update dialog box when save is clicked */
  openDialog()
  {
    this.dialogRef.close();
    const dialogRef = this.dialog.open(UpdateComponent, {
      data: this.data
    });
    dialogRef.afterClosed()
    .pipe(takeUntil(this.destroy$))  
    .subscribe(result => {
    });
  }
  /**Hitting Search userlist API */
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
  /**To bind mat-option value in the input box*/
  select(users)
  {
    this.searchword = users;
  }
  /**Add user profile information */
  enterNewLine(user)
  {
    for(let i = 0; i < this.usersList.length; i++)
    {
      if(this.usersList[i].email == user)
      {
        this.newList.push(this.usersList[i]);
      }
    }
    this.searchword =  null;
  }
  /**Close dialog box */
  save()
  {
    this.dialogRef.close();
  }
 /**Function unsubscribe */
  ngOnDestroy() 
  {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}

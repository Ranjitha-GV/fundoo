import { Component, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { Router, ParamMap } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material';
import { LabelComponent } from '../label/label.component';
import { SearchService } from '../../core/services/data/search.service';
import { environment } from '../../../environments/environment'
import { CropImageComponent } from '../crop-image/crop-image.component'
import { UsersService } from 'src/app/core/services/users/users.service';
import { NotesServiceService } from 'src/app/core/services/notes/notes-service.service';
import { Labels } from 'src/app/core/model/labels';


@Component({
  selector: 'app-fundoo-notes',
  templateUrl: './fundoo-notes.component.html',
  styleUrls: ['./fundoo-notes.component.scss']
})
export class FundooNotesComponent implements OnDestroy{
  destroy$: Subject<boolean> = new Subject<boolean>();
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  private show = 0;
  private searchElement;
  private grid = 0;
  private firstname;
  private email;
  private lastname;
  private pic;
  private image = {};
  private names = 'fundoo';
  private value = [];
  private id = localStorage.getItem('userId');
  private selectedFile = null;
  private flag = '';
  private image2 = localStorage.getItem('imageUrl');
  private img = environment.apiUrl + this.image2;
  @ViewChild('labelList') labelList: ElementRef;
  @ViewChild('newLabel') newLabel: ElementRef;

  constructor(public dialog: MatDialog, public data: SearchService, public route:
    ActivatedRoute, public snackBar: MatSnackBar, public breakpointObserver:
      BreakpointObserver, public myHttpService: UsersService, 
      public httpService: NotesServiceService, public router: Router) { }

/**Function to toggle divisions */
  toggle() {
    this.show = 1;
  }
/**Hitting API to logout from the fundoo */
  signout() {
    this.myHttpService.logout()
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      (data) => {
        this.snackBar.open("Logout successfull", "success", {
          duration: 3000
        })
        localStorage.removeItem('token');
        this.router.navigateByUrl('/login');
      },
      error => {
      })

  }
/**Pop up to add labels */
  openDialog(): void {
    const dialogRef = this.dialog.open(LabelComponent, {
      width: '300px',
      data: ''
    });

    dialogRef.afterClosed()
    .pipe(takeUntil(this.destroy$))
    .subscribe(result => {
      this.label();
    });
  }
/**Hitting API to add labels */
  label() {
    let tempArr: Labels[] = [];
    this.httpService.getLabels()
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      (data) => {
        var response: Labels[] = data['data']['details'];
        for (var i = 0; i < response.length; i++) {
          if (response[i].isDeleted == false) {
            tempArr.push(response[i]);
          }
        }
        this.value = tempArr;
        
      },
      error => {
      })
  }
  refresh()
  {
    window.location.reload();
  }
/**Navigate page to particular label component */
  labelClick(labelList) {
    var labelList = labelList.label;
    this.router.navigate(['/home/newlabel/' + labelList]);
  }
/**Navigate page to search component */
  searchEle() {
    this.router.navigate(['/home/search']);
  }
/**emitting event to search element */
  keyPress() {
    this.data.changeMessage(this.searchElement);
  }
/**Event to toggle between grid and list */
  view() {
    this.grid = 1;
    this.data.changeGridEvent(false);
  }
/**Event to toggle between grid and list */  
  viewClose() {
    this.grid = 0;
    this.data.changeGridEvent(true);
  }
/**passing profile picture event */
onUpload(event) {
this.profileCropOpen(event);

this.selectedFile = event.path[0].files[0];  
const uploadData = new FormData();
uploadData.append('file', this.selectedFile, this.selectedFile.name);
}
/**Navigate to particular label component */
clickLabel(labelsList) {
var labelsList = labelsList.label;
this.router.navigate(['/home/label/' + labelsList])
}
/**dialog box to open profile crop */
profileCropOpen(data): void { 
const dialogRefPic = this.dialog.open(CropImageComponent, {
width: '450px',
data: data
});

dialogRefPic.afterClosed()
.pipe(takeUntil(this.destroy$))
.subscribe(result => {
this.data.currentMsg
.pipe(takeUntil(this.destroy$))
.subscribe(message => this.pic = message)
if (this.pic == true) {
this.image2 = localStorage.getItem('imageUrl');
this.img = environment.apiUrl + this.image2;
}

});
}
/**To change names on the nav-bar according to the component name  */
nameChange(names)
{
  this.names = names;
  this.flag = names;
}

  ngOnInit() {
    this.firstname = localStorage.getItem('firstname');
    this.email = localStorage.getItem('email');
    this.lastname = localStorage.getItem('lastname');
    this.label();
    this.route.firstChild.paramMap.subscribe(
      (params: ParamMap)=>{
        this.names = params['params'].labelList;
        this.flag = params['params'].labelList;
      }
    )
    if(this.router.url == '/home/notes')
    {
      this.names = 'fundoo';
      this.flag = 'fundoo'
    }

    if(this.router.url == '/home/reminder')
    {
      this.names = 'Reminder';
      this.flag = 'Reminder';
    }
    if(this.router.url == '/home/bin')
    {
      this.names = 'Bin'; 
      this.flag = 'Bin';

    }
    if(this.router.url == '/home/archive')
    {
      this.names = 'Archive'; 
      this.flag = 'Archive';
    }
    if(this.router.url == '/home/questionAndAnswer/:notedetails')
    {
      this.names = 'fundoo';
      this.flag = 'fundoo'
    }
  }
  colorChange(label)
  {
     this.flag = label;
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}

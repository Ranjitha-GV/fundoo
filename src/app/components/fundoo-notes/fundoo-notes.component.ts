import { Component, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpService } from '../../core/services/http/http.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material';
import { LabelComponent } from '../label/label.component';
import { SearchService } from '../../core/services/data/search.service';
import { environment } from '../../../environments/environment'
import { CropImageComponent } from '../crop-image/crop-image.component'


@Component({
  selector: 'app-fundoo-notes',
  templateUrl: './fundoo-notes.component.html',
  styleUrls: ['./fundoo-notes.component.scss']
})
export class FundooNotesComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  show: any = 0;
  searchElement: any;
  public grid = 0;
  firstname: any;
  email: any;
  lastname: any;
  public pic;
  image = {};
  public names = 'fundoo';
  value = [];
  token = localStorage.getItem('token');
  id = localStorage.getItem('userId');
  selectedFile = null;
  Profile;
  public image2 = localStorage.getItem('imageUrl');
  img = environment.apiUrl + this.image2;
  @ViewChild('labelList') labelList: ElementRef;
  @ViewChild('newLabel') newLabel: ElementRef;

  constructor(public dialog: MatDialog, public data: SearchService, public route:
    ActivatedRoute, private snackBar: MatSnackBar, private breakpointObserver:
      BreakpointObserver, private myHttpService: HttpService, private router: Router) { }

/**Function to toggle divisions */
  toggle() {
    this.show = 1;
  }
/**Hitting API to logout from the fundoo */
  signout() {
    console.log(this.token);
    this.myHttpService.signoutPost('/user/logout', this.token).subscribe(
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

    dialogRef.afterClosed().subscribe(result => {
      this.label();
    });
  }
/**Hitting API to add labels */
  label() {
    let tempArr = [];
    this.myHttpService.getNotes('/noteLabels/getNoteLabelList', this.token).subscribe(
      (data) => {
        for (var i = 0; i < data['data']['details'].length; i++) {
          if (data['data']['details'][i].isDeleted == false) {
            tempArr.push(data['data']['details'][i]);
          }
        }
        tempArr.sort();
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

dialogRefPic.afterClosed().subscribe(result => {
this.data.currentMsg.subscribe(message => this.pic = message)
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
}

  ngOnInit() {
    this.firstname = localStorage.getItem('firstname');
    this.email = localStorage.getItem('email');
    this.lastname = localStorage.getItem('lastname');
    this.label();
  }
}

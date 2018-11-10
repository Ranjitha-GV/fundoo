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
  value = [];
  token = localStorage.getItem('token');
  id = localStorage.getItem('userId');
  selectedFile = null;
  Profile;
  @ViewChild('labelList') labelList: ElementRef;
  @ViewChild('newLabel') newLabel: ElementRef;

  constructor(public dialog: MatDialog, public data: SearchService, public route:
    ActivatedRoute, private snackBar: MatSnackBar, private breakpointObserver:
      BreakpointObserver, private myHttpService: HttpService, private router: Router) { }


  toggle() {
    this.show = 1;
  }

  signout() {
    console.log(this.token);
    this.myHttpService.signoutPost('/user/logout', this.token).subscribe(
      (data) => {
        console.log("POST Request is successful ", data);
        this.snackBar.open("Logout successfull", "success", {
          duration: 3000
        })
        localStorage.removeItem('token');
        this.router.navigateByUrl('/login');
      },
      error => {
        console.log("Error", error);
      })

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LabelComponent, {
      width: '300px',
      data: ''
    });

    dialogRef.afterClosed().subscribe(result => {
      this.label();
    });
  }

  label() {
    let tempArr = [];
    this.myHttpService.getNotes('/noteLabels/getNoteLabelList', this.token).subscribe(
      (data) => {
        console.log("GET Request is successful ", data);
        for (var i = 0; i < data['data']['details'].length; i++) {
          if (data['data']['details'][i].isDeleted == false) {
            tempArr.push(data['data']['details'][i]);
          }
        }
        this.value = tempArr;
      },
      error => {
        console.log("Error", error);
      })
  }

  labelClick(labelList) {
    var labelList = labelList.label;
    this.router.navigate(['/home/newlabel/' + labelList]);
  }

  searchEle() {
    this.router.navigate(['/home/search']);
  }

  keyPress() {
    this.data.changeMessage(this.searchElement);
  }

  view() {
    this.grid = 1;
    this.data.changeGridEvent(false);
  }
  
  viewClose() {
    this.grid = 0;
    this.data.changeGridEvent(true);
  }


public image2 = localStorage.getItem('imageUrl');
img = environment.apiUrl + this.image2;

onFileUpload(event) {
var token = localStorage.getItem('token');
this.profileCropOpen(event);

this.selectedFile = event.path[0].files[0];
const uploadData = new FormData();
uploadData.append('file', this.selectedFile, this.selectedFile.name);
}

clickLabel(labelsList) {
var labelsList = labelsList.label;
this.router.navigate(['/home/label/' + labelsList])
}
profileCropOpen(data): void { 
const dialogRefPic = this.dialog.open(CropImageComponent, {
width: '450px',
data: data
});

dialogRefPic.afterClosed().subscribe(result => {
console.log('The dialog was closed');
this.data.currentMsg.subscribe(message => this.pic = message)
console.log("pic", this.pic);
if (this.pic == true) {
this.image2 = localStorage.getItem('imageUrl');
this.img = environment.apiUrl + this.image2;
}

});
}

  ngOnInit() {
    this.firstname = localStorage.getItem('firstname');
    this.email = localStorage.getItem('email');
    this.lastname = localStorage.getItem('lastname');
    this.label();
  }
}

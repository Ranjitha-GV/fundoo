import { Component, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpService } from '../../services/http.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material';
import { LabelComponent } from '../label/label.component';
import { SearchService } from '../../services/search.service';


@Component({
  selector: 'app-fundoo-notes',
  templateUrl: './fundoo-notes.component.html',
  styleUrls: ['./fundoo-notes.component.css']
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
  value = [];
  token = localStorage.getItem('token');
  id = localStorage.getItem('userId');
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

  ngOnInit() {
    this.firstname = localStorage.getItem('firstname');
    this.email = localStorage.getItem('email');
    this.lastname = localStorage.getItem('lastname');
    this.label();
  }
}

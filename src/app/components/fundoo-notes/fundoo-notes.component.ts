import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpService } from '../../services/http.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { LabelComponent } from '../label/label.component';




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
    show : any = 0;
   toggle()
    {
      this.show = 1;
    }

  constructor(public dialog: MatDialog,public route: ActivatedRoute, private snackBar: MatSnackBar, private breakpointObserver: BreakpointObserver, private myHttpService: HttpService, private router : Router) {}
  token = localStorage.getItem('token')
  signout()
    {
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
     firstname: any;
     email: any;
     lastname: any;
    

     openDialog(): void {
      const dialogRef = this.dialog.open(LabelComponent, {
        width: '300px',
        data: ''
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        // this.animal = result;
      });
    }
    value = [];
    label()
    { 
    this.myHttpService.getNotes('/noteLabels/getNoteLabelList', this.token).subscribe(
     (data) => {
       console.log("GET Request is successful ", data);
       for(var i = 0; i < data['data'].length; i++)
       {
         this.value.push(data['data'][i]);
       }
       console.log(this.value);
       
 },
 error => {
   console.log("Error", error);
 })
 }

    ngOnInit()
    {
       this.firstname = localStorage.getItem('firstname');
       this.email = localStorage.getItem('email');
       this.lastname = localStorage.getItem('lastname');
  }
}

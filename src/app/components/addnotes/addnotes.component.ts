import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';


@Component({
  selector: 'app-addnotes',
  templateUrl: './addnotes.component.html',
  styleUrls: ['./addnotes.component.css']
})
export class AddnotesComponent implements OnInit {

  constructor(private myHttpService: HttpService) { }
  hide : any = 0;
  move()
  {
    this.hide = 1;
  }
  token = localStorage.getItem('token');
  back()
  {
    this.hide = 0;
    this.myHttpService.postNotes('/user/logout',{
      'title': document.getElementById('title'),
      'description':document.getElementById('description'),
      'labelIdList':'',
      'checklist':'',
      'isPined':'false'
    }, this.token).subscribe(
      (data) => {
        console.log("POST Request is successful ", data);
  })
  error => {
    console.log("Error", error);
  }
}


  ngOnInit() {
  }

}

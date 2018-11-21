import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NotesServiceService } from 'src/app/core/services/notes/notes-service.service';

@Component({
  selector: 'app-new-label',
  templateUrl: './new-label.component.html',
  styleUrls: ['./new-label.component.scss']
})
export class NewLabelComponent implements OnInit {

  constructor(public route: ActivatedRoute, public httpService: NotesServiceService) { }

  private labelArray = [];
  private labelList;

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.labelList = params['labelList'];
        this.getLabel(this.labelList);

      }
    )
  }
  getLabel(labelList) {
    this.httpService.getNotesByLabel(labelList, {})
      .subscribe(
        (data) => {
          this.labelArray = data['data'].data;
        },
        error => {
        })
  }
}

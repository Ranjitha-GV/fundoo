import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpService } from '../../core/services/http/http.service';

@Component({
  selector: 'app-new-label',
  templateUrl: './new-label.component.html',
  styleUrls: ['./new-label.component.scss']
})
export class NewLabelComponent implements OnInit {

  constructor(private route: ActivatedRoute, private myHttpService: HttpService) { }

  labelArray = [];
  labelList;
  token = localStorage.getItem('token');

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.labelList = params['labelList'];
        this.getLabel(this.labelList);

      }
    )
  }
  getLabel(labelList) {
    this.myHttpService.postArchive('/notes/getNotesListByLabel/' + labelList, {}, this.token)
      .subscribe(
        (data) => {
          this.labelArray = data['data'].data;
        },
        error => {
        })
  }
}

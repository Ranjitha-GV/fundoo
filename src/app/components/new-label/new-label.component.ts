import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NotesServiceService } from 'src/app/core/services/notes/notes-service.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-new-label',
  templateUrl: './new-label.component.html',
  styleUrls: ['./new-label.component.scss']
})
export class NewLabelComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(public route: ActivatedRoute, public httpService: NotesServiceService) { }

  private labelArray = [];
  private labelList;

  ngOnInit() {
    this.route.params
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      (params: Params) => {
        this.labelList = params['labelList'];
        this.getLabel(this.labelList);

      }
    )
  }
/**Hitting API to get labels */
  getLabel(labelList) {
    this.httpService.getNotesByLabel(labelList, {})
    .pipe(takeUntil(this.destroy$))  
    .subscribe(
        (data) => {
          this.labelArray = data['data'].data;
        },
        error => {
        })
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}

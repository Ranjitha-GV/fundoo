import { Component, OnInit, Input, EventEmitter, Output, OnDestroy } from '@angular/core';
import { NotesServiceService } from 'src/app/core/services/notes/notes-service.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-pin',
  templateUrl: './pin.component.html',
  styleUrls: ['./pin.component.scss']
})
export class PinComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(public httpService: NotesServiceService) { }

  private show = 0;
  @Input() pinArray;
  @Output() pinEmit = new EventEmitter();
  

  ngOnInit() {
  }
  token = localStorage.getItem('token');
/**Hitting API to pin notes */
  pin() {
    this.show = 1;
    this.httpService.pinUnpin(
      {
        "noteIdList": [this.pinArray.id],
        "isPined": true
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data) => {
          this.pinEmit.emit({});

        },
        error => {
        })
  }
/**Hitting API to unpin notes */
  unPin()
  {
    this.show = 0;
    this.httpService.pinUnpin(
      {
        "noteIdList": [this.pinArray.id],
        "isPined": false
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data) => {
          this.pinEmit.emit({});

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

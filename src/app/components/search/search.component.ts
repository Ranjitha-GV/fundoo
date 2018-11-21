import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpService } from '../../core/services/http/http.service';
import { SearchService } from '../../core/services/data/search.service';
import { NotesServiceService } from 'src/app/core/services/notes/notes-service.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(public myHttpService: HttpService, public data: SearchService, 
    public httpService: NotesServiceService) { }
  
  private response = [];
  private noteCard = [];
  private searchElement;

  ngOnInit() {
    this.data.currentMessage
    .pipe(takeUntil(this.destroy$))  
    .subscribe(message => {
      this.searchElement = message;
    })
    this.getNoteCard();
  }

  getNoteCard() {
    this.httpService.notesList()
    .pipe(takeUntil(this.destroy$))  
    .subscribe(
      (data) => {
        this.noteCard = [];
        this.response = data['data']['data'];
        for (var i = data['data']['data'].length - 1; i >= 0; i--) {
          if (data['data']['data'][i].isDeleted == false && data['data']['data'][i].isArchived == false) {
            this.noteCard.push(data['data']['data'][i]);
          }
        }
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

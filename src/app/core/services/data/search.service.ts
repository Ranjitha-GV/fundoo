import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private messageSource = new Subject();
  currentMessage = this.messageSource.asObservable();

  private chipEvent = new Subject<boolean>();
  currentChipEvent = this.chipEvent.asObservable();

  private gridEvent = new Subject<boolean>();
  currentGridEvent = this.gridEvent.asObservable();

  private msgSource = new BehaviorSubject(false);
  currentMsg = this.msgSource.asObservable();

  constructor() { }

  changeMessage(message: string) {
    this.messageSource.next(message);
  }

  changeChipEvent(message: boolean) {
    this.chipEvent.next(message);
  }

  changeGridEvent(message: boolean) {
    this.gridEvent.next(message);
  }

  changeMsg(message: boolean) {
    this.msgSource.next(message);
  }

}

import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { NotesServiceService } from 'src/app/core/services/notes/notes-service.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss']
})
export class ColorComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(public httpService: NotesServiceService) { }
  private colorsArray = 
  [[{ 'color': '#ffffff', 'name': 'White' },
  { 'color': '#f28b82', 'name': 'Red' },
  { 'color': '#fbbc04', 'name': 'Orange' },
  { 'color': '#fff475', 'name': 'Yellow' }],

  [{ 'color': '#ccff90', 'name': 'Green' },
  { 'color': '#a7ffeb', 'name': 'Teal' },
  { 'color': '#cbf0f8', 'name': 'Blue' },
  { 'color': '#aecbfa', 'name': 'Dark blue' }],

  [{ 'color': '#d7aefb', 'name': 'Purple' },
  { 'color': '#fdcfe8', 'name': 'Pink' },
  { 'color': '#e6c9a8', 'name': 'Brown' },
  { 'color': '#e8eaed', 'name': 'Gray' }]]

  private card = [];
  @Input() color;
  @Output() changeColor = new EventEmitter();
  @Output() emitColor = new EventEmitter();

  ngOnInit() {
  }
/**Hitting API to change color of notes */
  colorChange(id) {
    this.emitColor.emit(id);
    if (this.color != undefined) {
      this.httpService.changeColor(
        {
          "color": id,
          "noteIdList": [this.color.id]
        })
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (data) => {
            localStorage.setItem('colorId', this.color.id);
            this.changeColor.emit({

            });
          },
          error => {
          })
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}




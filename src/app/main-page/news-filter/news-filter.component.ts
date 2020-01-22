import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-news-filter',
  templateUrl: './news-filter.component.html',
  styleUrls: ['./news-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsFilterComponent implements OnInit {
  @Input() currentSource: string;
  @Input() currentSearchQuery: string;
  @Input() onlyMyNews: boolean;
  @Input() sources: Object[];
  @Output() currentSourceChange: EventEmitter<string> = new EventEmitter();
  @Output() currentSearchQueryChange: EventEmitter<string> = new EventEmitter();
  @Output() onlyMyNewsChange: EventEmitter<string> = new EventEmitter();


  constructor() { }

  ngOnInit() {
  }

  onChangeCurrentSource({target}) {
    const sourceid = target.getAttribute('data-sourceId');
    this.currentSourceChange.emit(sourceid);
  }

  onChangeCurrentSearchQuery({key, target: {value}}) {
    if (key === 'Enter') {
      this.currentSearchQueryChange.emit(value);
    }
  }

  onChangeOnlyMyNews({target: {checked}}) {
    this.onlyMyNewsChange.emit(checked);
  }
}

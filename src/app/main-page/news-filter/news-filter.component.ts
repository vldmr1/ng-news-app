import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-news-filter',
  templateUrl: './news-filter.component.html',
  styleUrls: ['./news-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsFilterComponent {
  @Input() currentSource: string;
  @Input() currentSearchQuery: string;
  @Input() onlyMyNews: boolean;
  @Input() sources: Object[];
  @Output() currentSourceChange: EventEmitter<string> = new EventEmitter();
  @Output() currentSearchQueryChange: EventEmitter<string> = new EventEmitter();
  @Output() onlyMyNewsChange: EventEmitter<string> = new EventEmitter();


  constructor(
    public dataService: DataService,
  ) { }

  onChangeCurrentSource({target}) {
    console.log(target);
    // this.dataService.changeCurrentSource(target.innerText);
    const sourceId = target.dataset.sourceid;
    this.currentSourceChange.emit(sourceId);
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

import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsListComponent implements OnInit {
  @Input() articles: any;
  @Output() loadMore: EventEmitter<{}> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onLoadMoreClick() {
    console.log(this.articles);
    this.loadMore.emit({});
  }

  trackByIndex(index: number): number {
    return index;
  };

}

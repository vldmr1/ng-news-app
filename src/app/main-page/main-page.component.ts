import { Component, OnInit, KeyValueDiffer, KeyValueDiffers, DoCheck } from '@angular/core';
import { ARTICLES } from '../../assets/mock-data/articles';
import { SOURCES } from '../../assets/mock-data/sources';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})

export class MainPageComponent implements OnInit, DoCheck {
  currentSourceId: string = '';
  currentSearchQuery: string = '';
  onlyMyNews: boolean = false;
  pageIndex: number = 1;
  sources: Object[] = SOURCES;
  articles: Object[];
  differ: KeyValueDiffer<string, any>;

  constructor(private differs: KeyValueDiffers) {
    this.differ = this.differs.find({}).create();
  }

  ngOnInit() {
    this.filterArticles(this.currentSourceId, this.currentSearchQuery);
  }

  ngDoCheck() {
    const change = this.differ.diff(this);
    if (change) {
      change.forEachChangedItem(({key}) => {
        switch (key) {
          case 'currentSourceId':
            this.pageIndex = 1;
            this.currentSearchQuery = '';
            this.filterArticles(this.currentSourceId, this.currentSearchQuery);
            break;
          case 'currentSearchQuery':
            this.pageIndex = 1;
            this.filterArticles(this.currentSourceId, this.currentSearchQuery);
            break;
          case 'pageIndex':
            this.filterArticles(this.currentSourceId, this.currentSearchQuery);
            break;
          case 'onlyMyNews':
            this.pageIndex = 1;
            this.currentSourceId = '';
            this.currentSearchQuery = '';
            this.filterArticles(this.currentSourceId, this.currentSearchQuery);
            break;
          default:
            break;
        }
      });
    }
  }

  filterArticles(currentSource, currentSearch) {
    this.articles = ARTICLES.reduce((result, {source, articles, isLocal}) => {
      if (!isLocal && this.onlyMyNews !== Boolean(isLocal)) return result;

      const articlesBySearch = articles.filter(({title}) =>
        title && title.toLowerCase().includes(currentSearch.toLowerCase()));

      if (currentSource === '') {
        return [...result, ...articlesBySearch];
      }

      return source === currentSource ? [...result, ...articlesBySearch] : result;
    }, []).slice(0, this.pageIndex * 3);
  }

  onLoadMoreClicked() {
    this.pageIndex += 1;
  }
}

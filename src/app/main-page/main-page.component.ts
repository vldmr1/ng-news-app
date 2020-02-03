import { Component, OnInit, KeyValueDiffer, KeyValueDiffers, DoCheck } from '@angular/core';
import { DataService, NewsSourceInterface } from '../services/data.service';

import {map, tap, scan, switchMap, mergeMap} from 'rxjs/operators';
import { Observable, merge, concat } from 'rxjs';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})

export class MainPageComponent implements OnInit, DoCheck {
  currentSourceId: string = '';
  public currentSearchQuery: string = '';
  onlyMyNews: boolean = false;
  public pageSize: number = 9;
  public currentPageNumber: number = 1;
  public articles$: Observable<any>;
  public sources$: Observable<NewsSourceInterface[]>;
  differ: KeyValueDiffer<string, any>;

  constructor(
    private differs: KeyValueDiffers,
    public dataService: DataService,
  ) {
    this.differ = this.differs.find({}).create();
  }

  ngOnInit() {
    this.sources$ = this.dataService.fetchNewsSources()
      .pipe(
        map(({sources}) => sources),
      );
  }

  ngDoCheck() {
    const change = this.differ.diff(this);
    if (change) {
      change.forEachChangedItem(({key}) => {
        switch (key) {
          case 'currentSourceId':
            this.currentSearchQuery = '';
            this.currentPageNumber = 1;
            this.articles$ = this.fetchArticles();
            break;
          case 'currentSearchQuery':
            this.currentPageNumber = 1;
            this.articles$ = this.fetchArticles();
            break;
          case 'currentPageNumber':
            this.articles$ = this.fetchArticles();
            break;
          case 'onlyMyNews':
            this.currentPageNumber = 1;
            this.currentSourceId = '';
            this.currentSearchQuery = '';

            break;
          default:
            break;
        }
      });
    }
  }

  fetchArticles() {
    const {currentSourceId, currentSearchQuery, currentPageNumber} = this;
    return this.dataService.fetchArticles(currentSourceId, currentSearchQuery, currentPageNumber)
      .pipe(
        map(({articles}) => articles)
      );
  }

  fetchLocalNews() {
    
  }

  onLoadMoreClicked() {
    this.currentPageNumber++;
    // this.articles$ = this.articles$.pipe(
    //   switchMap(() => {
    //     console.log('switchMap');
    //     return this.fetchArticles()}),
    //   scan((acc, curr) => {
    //     console.log('scan');
    //     return [...acc, curr]}, [])
    // )
  }
}

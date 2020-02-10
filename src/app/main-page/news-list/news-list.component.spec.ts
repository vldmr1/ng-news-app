import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsListComponent } from './news-list.component';
import { ArticleInterface } from 'src/app/interfaces/interfaces';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('NewsListComponent', () => {
  const articles: ArticleInterface[] = [
    {
      source: {
        id: 'bbc-news',
        name: 'BBC News'
      },
      author: 'Author 1',
      title: 'Title 1',
      description: 'Description 1',
      url: 'Url 1',
      urlToImage: 'Url To Image 1',
      publishedAt: '2020-02-09T14:30:52Z',
      content: 'Content 1',
    },
    {
      source: {
        id: 'bbc-sport',
        name: 'BBC Sport'
      },
      author: 'Author 2',
      title: 'Title 2',
      description: 'Description 2',
      url: 'Url 2',
      urlToImage: 'Url To Image 2',
      publishedAt: '2020-02-09T14:30:52Z',
      content: 'Content 2',
    },
  ];


  let component: NewsListComponent;
  let fixture: ComponentFixture<NewsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsListComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsListComponent);
    component = fixture.componentInstance;
    component.articles = articles;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onLoadMoreClick', () => {
    beforeEach(() => {
      spyOn(component.loadMore, 'emit').and.callThrough();
      component.onLoadMoreClick();
    });

    it('should emit event for loading new articles', () => {
      expect(component.loadMore.emit).toHaveBeenCalled();
    });
  });

  describe('trackByIndex', () => {
    it('should emit event for loading new articles', () => {
      const expectedResult: number = component.trackByIndex(1);
      expect(expectedResult).toEqual(1);
    });
  });
});

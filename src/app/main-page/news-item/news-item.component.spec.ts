import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { of } from 'rxjs';

import { DataService } from 'src/app/services/data.service';
import { createSpy } from 'src/app/createSpy';
import { ArticleInterface } from 'src/app/interfaces/interfaces';
import { NewsItemComponent } from './news-item.component';

describe('NewsItemComponent', () => {
  const article: ArticleInterface = {
    _id: '111',
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
  };

  const articleIndex: number = 1;
  let component: NewsItemComponent;
  let fixture: ComponentFixture<NewsItemComponent>;
  let dataService: jasmine.SpyObj<DataService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsItemComponent ],
      providers: [
        { provide: DataService, useValue: createSpy(DataService.prototype) },
        { provide: Router, useValue: createSpy(Router.prototype) }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    router = TestBed.get(Router);
    dataService = TestBed.get(DataService);
    fixture = TestBed.createComponent(NewsItemComponent);
    component = fixture.componentInstance;
    component.article = article;
    component.articleIndex = articleIndex;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('handleArticleSelection', () => {
    beforeEach(() => {
      spyOn(component, 'navigateToArticle').and.callThrough();
      component.handleArticleSelection();
    });

    it('should call navigation to article and emit current article', () => {
      expect(component.navigateToArticle).toHaveBeenCalled();
      expect(dataService.setCurrentArticle).toHaveBeenCalledWith(article);
    });
  });

  describe('navigateToArticle', () => {
    beforeEach(() => {
      router.navigate.and.returnValue(new Promise((resolve) => {resolve(true)}));
      component.navigateToArticle();
    });

    it('should call navigation to article', () => {
      expect(router.navigate).toHaveBeenCalledWith(['/article/1']);
    });
  });

  describe('navigateToEditPage', () => {
    beforeEach(() => {
      router.navigate.and.returnValue(new Promise((resolve) => {resolve(true)}));
      component.navigateToEditPage();
    });

    it('should call navigation to edit page', () => {
      expect(router.navigate).toHaveBeenCalledWith(['/edit']);
    });
  });

  describe('onSetCurrentArticle', () => {
    beforeEach(() => {
      spyOn(component, 'navigateToEditPage').and.callThrough();
      component.onSetCurrentArticle();
    });

    it('should call navigation to edit page and emit current article', () => {
      expect(dataService.setCurrentArticle).toHaveBeenCalledWith(article);
      expect(component.navigateToEditPage).toHaveBeenCalled();
    });
  });

  describe('onDeleteArticle', () => {
    beforeEach(() => {
      dataService.deleteLocalArticle.and.returnValue(of('Article deleted'));
      component.onDeleteArticle();
    });

    it('should call navigation to edit page and emit current article', () => {
      expect(dataService.deleteLocalArticle).toHaveBeenCalledWith('111');
    });
  });
});

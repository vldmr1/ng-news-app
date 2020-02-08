import { BehaviorSubject, Observable } from 'rxjs';
import {map, tap, first} from 'rxjs/operators';


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ARTICLES } from '../../assets/mock-data/articles';
import { SOURCES } from '../../assets/mock-data/sources';
import { environment } from '../../environments/environment';
import { SourcesResponseInterface, ArticleInterface, ArticlesResponseInterface } from '../interfaces/interfaces';


@Injectable({
  providedIn: 'root'
})

export class DataService {
  private currentSource: BehaviorSubject<string> = new BehaviorSubject('The News App');
  public currentSource$: Observable<string> = this.currentSource.asObservable();
  public articles = ARTICLES;
  public sources = SOURCES;

  private currentArticle: BehaviorSubject<ArticleInterface> = new BehaviorSubject<ArticleInterface>({});
  public currentArticle$: Observable<ArticleInterface> = this.currentArticle.asObservable();

  public filteredArticles: Object[];

  constructor(
    private http: HttpClient,
  ) {}

  public changeCurrentSource(value: string) {
    this.currentSource.next(value);
  }

  public setCurrentArticle(article: ArticleInterface) {
    this.currentArticle.next(article);
  }

  public fetchNewsSources(): Observable<SourcesResponseInterface> {
    return this.http.get<SourcesResponseInterface>(`https://newsapi.org/v2/sources?apiKey=${environment.API_KEY}`);
  }

  public fetchArticles(sourceId: string = '', query: string = '', currentPageNumber: number): Observable<ArticlesResponseInterface> {
    console.log('DATASERVICE: fetchArticles');
    return this.http.get<ArticlesResponseInterface>(`https://newsapi.org/v2/everything?apiKey=${environment.API_KEY}&sources=${sourceId}&q=${query}&pageSize=9&page=${currentPageNumber}`);
  }

  public fetchLocalNews(): Observable<ArticleInterface[]> {
    return this.http.post<ArticleInterface[]>(`http://localhost:3000/api/users/login`, {email: environment.email, password: environment.password})
      .pipe(
        tap(resp => console.log(resp))
      );
  }

  public deleteLocalArticle(articleId: string): Observable<any> {
    return this.http.delete<any>(`http://localhost:3000/api/articles/${articleId}`)
    .pipe(
      tap(({message}) => console.log(message))
    );
  }

  public addLocalArticle(article: ArticleInterface): void {
    this.http.post('http://localhost:3000/api/articles/', article)
      .pipe(
        first()
      ).subscribe();
  }

  public updateLocalArticle(id: string, article: ArticleInterface): void {
    this.http.patch(`http://localhost:3000/api/articles/${id}`, article)
      .pipe(
        first()
      ).subscribe();
  }
}

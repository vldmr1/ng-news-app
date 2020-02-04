import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService, ArticleInterface } from '../services/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-article-page',
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.scss']
})
export class ArticlePageComponent implements OnInit {
  public id: string;
  public article: ArticleInterface;
  public currentArticleSubscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private dataService: DataService,
    ) { }

  ngOnInit() {
    this.currentArticleSubscription = this.dataService.currentArticle$.subscribe(
      (response: ArticleInterface) => {
        this.article = response
    });
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-article-page',
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.scss']
})
export class ArticlePageComponent implements OnInit {
  public id: string;
  public article: any;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.article = JSON.parse(this.activatedRoute.snapshot.paramMap.get('article'))
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
  }
}

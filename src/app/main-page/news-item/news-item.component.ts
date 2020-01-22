import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsItemComponent implements OnInit {
  @Input() article: any;

  constructor(private router: Router) { }

  ngOnInit() {

  }

  navigateToArticle() {
    this.router.navigate([`/article/${this.article.publishedAt}`, { article : JSON.stringify(this.article) }])
  }
}

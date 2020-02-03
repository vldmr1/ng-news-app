import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsItemComponent implements OnInit {
  @Input() article: any;
  @Input() articleIndex: number;

  constructor(
    private router: Router,
    private dataService: DataService,
  ) { }

  ngOnInit() {

  }

  handleArticleSelection() {
    this.navigateToArticle();
    this.dataService.setCurrentArticle(this.articleIndex);
  }

  navigateToArticle() {
    this.router.navigate([`/article/${this.articleIndex}`]);
  }

  setCurrentArticle() {
    this.dataService.setCurrentArticle(this.article);
  }
}

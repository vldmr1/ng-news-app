import { Component, OnInit, ChangeDetectionStrategy, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsItemComponent implements OnInit, OnDestroy {
  @Input() article: any;
  @Input() articleIndex: number;
  public deleteArticleSubscription: Subscription;

  constructor(
    private router: Router,
    private dataService: DataService,
  ) { }

  ngOnInit() {

  }

  ngOnDestroy() {
    // this.deleteArticleSubscription.unsubscribe();
  }

  handleArticleSelection(article) {
    this.navigateToArticle();
    this.dataService.setCurrentArticle(article);
  }

  navigateToArticle() {
    this.router.navigate([`/article/${this.articleIndex}`]);
  }

  navigateToEditPage() {
    this.router.navigate([`/edit`]);
  }

  onSetCurrentArticle(article) {
    console.log(article);
    this.dataService.setCurrentArticle(article);
    this.navigateToEditPage();
  }

  onDeleteArticle(id) {
    this.deleteArticleSubscription = this.dataService.deleteLocalArticle(id).subscribe();
  }
}

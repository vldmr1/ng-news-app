import { Component, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsItemComponent implements OnDestroy {
  @Input() article: any;
  @Input() articleIndex: number;
  public deleteArticleSubscription: Subscription;

  constructor(
    private router: Router,
    private dataService: DataService,
  ) { }

  ngOnDestroy() {
    this.deleteArticleSubscription.unsubscribe();
  }

  handleArticleSelection() {
    this.navigateToArticle();
    this.dataService.setCurrentArticle(this.article);
  }

  navigateToArticle() {
    this.router.navigate([`/article/${this.articleIndex}`]);
  }

  navigateToEditPage() {
    this.router.navigate([`/edit`]);
  }

  onSetCurrentArticle() {
    // console.log(article);
    this.dataService.setCurrentArticle(this.article);
    this.navigateToEditPage();
  }

  onDeleteArticle() {
    this.deleteArticleSubscription = this.dataService.deleteLocalArticle(this.article._id).subscribe();
  }
}

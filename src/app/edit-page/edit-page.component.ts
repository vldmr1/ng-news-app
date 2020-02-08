import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ChangeDetectorRef,
  OnDestroy
} from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { Observable, Subscription } from 'rxjs';
import { DataService  } from '../services/data.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { ArticleInterface } from '../interfaces/interfaces';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditPageComponent implements OnInit, OnDestroy {
  public article: ArticleInterface;
  public currentArticleSubscription: Subscription;

  public articleForm: FormGroup;

  constructor(
    private dataService: DataService,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private router: Router,
  ) {}

  ngOnInit() {
    this.currentArticleSubscription = this.dataService.currentArticle$.subscribe(
      (response: ArticleInterface) => {
        this.article = response
    });

    const {title, author, description, content, publishedAt, url, urlToImage} = this.article;

    this.articleForm = this.fb.group({
      title: [title, Validators.required],
      description: [description],
      content: [content, Validators.required],
      // photo: this.fb.group({
      //   radioType: ["url"],
      //   inputUrl: [urlToImage],
      //   inputImg: [""]
      // }),
      date: [publishedAt],
      author: [author],
      url: [url]
    });
  }

  ngOnDestroy() {
    this.currentArticleSubscription.unsubscribe();
  }

  onCancelForm() {
    this.router.navigate([`/`]);
  }

  submitForm() {
    if (Object.keys(this.article).length > 0) {
      this.dataService.updateLocalArticle(this.article._id, this.articleForm.value);
    } else {
      console.log(this.articleForm.value);
      this.dataService.addLocalArticle({ source: { id: 'local-news', name: 'Local News' }, ...this.articleForm.value});
    }
  }
}

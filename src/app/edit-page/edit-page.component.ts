import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ChangeDetectorRef
} from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { Observable, Subscription } from 'rxjs';
import { ArticleInterface, DataService, ArticlesResponseInterface } from '../services/data.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditPageComponent implements OnInit {
  public article: ArticleInterface;
  public currentArticleSubscription: Subscription;

  public articleForm: FormGroup;

  constructor(
    private dataService: DataService,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.currentArticleSubscription = this.dataService.currentArticle$.subscribe(
      (response: ArticleInterface) => this.article = response);

      const {title, author, description, content, publishedAt, url, urlToImage} = this.article;

    this.articleForm = this.fb.group({
      heading: [title, Validators.required],
      shortDescription: [description],
      content: [content, Validators.required],
      photo: this.fb.group({
        radioType: ["url"],
        inputUrl: [urlToImage],
        inputImg: [""]
      }),
      date: [publishedAt],
      author: [author],
      sourceUrl: [url]
    });
  }

  submitForm() {
    console.warn('Article saved')
  }
}

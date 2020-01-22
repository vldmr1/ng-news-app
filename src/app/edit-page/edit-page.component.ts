import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ChangeDetectorRef
} from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditPageComponent implements OnInit {

  public articleForm = this.fb.group({
    heading: ["", Validators.required],
    shortDescription: [""],
    content: ["", Validators.required],
    photo: this.fb.group({
      radioType: ["url"],
      inputUrl: [""],
      inputImg: [""]
    }),
    date: [""],
    author: [""],
    sourceUrl: [""]
  });

  constructor(
    private fb: FormBuilder,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
  }

  submitForm() {
    console.warn('Article saved')
  }
}

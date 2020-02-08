import { Component, Injector, ViewEncapsulation } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { DomSanitizer } from '@angular/platform-browser';

import { DataService } from './services/data.service';
import { FooterComponent } from "./layout/footer/footer.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  public footer: any = null;

  constructor(
    private dataService: DataService,
    public injector: Injector,
    domSanitizier: DomSanitizer) {
    const FooterElement = createCustomElement(FooterComponent, {
      injector: injector
    });
    customElements.define("app-footer", FooterElement);
    this.footer = domSanitizier.bypassSecurityTrustHtml(
      "<app-footer footer='Powered by NewsApi'></app-footer>"
    );
  }
}

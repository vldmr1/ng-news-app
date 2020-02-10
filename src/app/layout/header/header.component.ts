import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public currentSource$: Observable<string>;

  constructor(
    private dataService: DataService,
  ) {
    this.currentSource$ = this.dataService.currentSource$;
   }
}

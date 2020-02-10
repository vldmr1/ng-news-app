import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { createSpy } from 'src/app/createSpy';
import { DataService } from 'src/app/services/data.service';
import { NewsSourceInterface } from 'src/app/interfaces/interfaces';
import { NewsFilterComponent } from './news-filter.component';

describe('NewsFilterComponent', () => {
  let component: NewsFilterComponent;
  let fixture: ComponentFixture<NewsFilterComponent>;
  let dataService: jasmine.SpyObj<DataService>;

  const currentSource: string = 'The News App';
  const currentSearchQuery: string = '';
  const onlyMyNews: boolean = false;
  const mockedSources: NewsSourceInterface[] = [
    {
      id: 'bbc-news',
      name: 'BBC News',
      description: 'Description',
      url: 'Url',
      category: 'Category',
      language: 'Language',
      country: 'Country',
    },
    {
      id: 'bbc-sport',
      name: 'BBC Sport',
      description: 'Description',
      url: 'Url',
      category: 'Category',
      language: 'Language',
      country: 'Country',
    },
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsFilterComponent ],
      providers: [
        { provide: DataService, useValue: createSpy(DataService.prototype)}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    dataService = TestBed.get(DataService);
    fixture = TestBed.createComponent(NewsFilterComponent);
    component = fixture.componentInstance;

    component.currentSource = currentSource;
    component.currentSearchQuery = currentSearchQuery;
    component.onlyMyNews = onlyMyNews;
    component.sources = mockedSources;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onChangeCurrentSource', () => {
    beforeEach(() => {
      spyOn(component.currentSourceChange, 'emit').and.callThrough();
      component.onChangeCurrentSource({
        target: {
          dataset: {
            sourceid: 'bbc-news'
          }
        }
      });
    });

    it('should emit new source id', () => {
      expect(component.currentSourceChange.emit).toHaveBeenCalledWith('bbc-news');
    });
  });

  describe('onChangeCurrentSearchQuery', () => {
    beforeEach(() => {
      spyOn(component.currentSearchQueryChange, 'emit').and.callThrough();
    });

    it('should emit new search query', () => {
      component.onChangeCurrentSearchQuery({
        key: 'Enter',
        target: {
          value: 'search'
        }
      });
      expect(component.currentSearchQueryChange.emit).toHaveBeenCalledWith('search');
    });

    it('shouldn"t emit new search query', () => {
      component.onChangeCurrentSearchQuery({
        key: 'Space',
        target: {
          value: 'search'
        }
      });
      expect(component.currentSearchQueryChange.emit).not.toHaveBeenCalled();
    });
  });

  describe('onChangeOnlyMyNews', () => {
    beforeEach(() => {
      spyOn(component.onlyMyNewsChange, 'emit').and.callThrough();
      component.onChangeOnlyMyNews({
        target: {
          checked: true
        }
      });
    });

    it('should emit onlyMyNewsChange value', () => {

      expect(component.onlyMyNewsChange.emit).toHaveBeenCalledWith(true);
    });
  });

});

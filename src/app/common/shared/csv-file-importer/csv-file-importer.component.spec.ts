import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsvFileImporterComponent } from './csv-file-importer.component';

describe('CsvFileImporterComponent', () => {
  let component: CsvFileImporterComponent;
  let fixture: ComponentFixture<CsvFileImporterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsvFileImporterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsvFileImporterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

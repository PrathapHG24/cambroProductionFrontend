import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableContentViewComponent } from './table-content-view.component';

describe('TableContentViewComponent', () => {
  let component: TableContentViewComponent;
  let fixture: ComponentFixture<TableContentViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableContentViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableContentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

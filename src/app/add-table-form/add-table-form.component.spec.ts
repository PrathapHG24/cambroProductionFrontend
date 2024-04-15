import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTableFormComponent } from './add-table-form.component';

describe('AddTableFormComponent', () => {
  let component: AddTableFormComponent;
  let fixture: ComponentFixture<AddTableFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTableFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTableFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

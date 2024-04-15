import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditdatabaseComponent } from './edit-database.component';

describe('EditdatabaseComponent', () => {
  let component: EditdatabaseComponent;
  let fixture: ComponentFixture<EditdatabaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditdatabaseComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditdatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

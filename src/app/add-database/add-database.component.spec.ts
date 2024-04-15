import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdddatabaseComponent } from './add-database.component';

describe('AdddatabaseComponent', () => {
  let component: AdddatabaseComponent;
  let fixture: ComponentFixture<AdddatabaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdddatabaseComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdddatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

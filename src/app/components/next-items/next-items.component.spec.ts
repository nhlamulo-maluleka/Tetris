import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextItemsComponent } from './next-items.component';

describe('NextItemsComponent', () => {
  let component: NextItemsComponent;
  let fixture: ComponentFixture<NextItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NextItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NextItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

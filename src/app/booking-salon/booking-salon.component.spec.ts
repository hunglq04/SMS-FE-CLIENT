import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingSalonComponent } from './booking-salon.component';

describe('BookingSalonComponent', () => {
  let component: BookingSalonComponent;
  let fixture: ComponentFixture<BookingSalonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingSalonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingSalonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

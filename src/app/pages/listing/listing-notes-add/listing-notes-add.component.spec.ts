import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingNotesAddComponent } from './listing-notes-add.component';

describe('ListingNotesAddComponent', () => {
  let component: ListingNotesAddComponent;
  let fixture: ComponentFixture<ListingNotesAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListingNotesAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListingNotesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

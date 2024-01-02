import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingNotesComponent } from './listing-notes.component';

describe('ListingNotesComponent', () => {
  let component: ListingNotesComponent;
  let fixture: ComponentFixture<ListingNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListingNotesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListingNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

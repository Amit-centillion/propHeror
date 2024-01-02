import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewingsTableComponent } from './viewings-table.component';

describe('ViewingsTableComponent', () => {
  let component: ViewingsTableComponent;
  let fixture: ComponentFixture<ViewingsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewingsTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewingsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

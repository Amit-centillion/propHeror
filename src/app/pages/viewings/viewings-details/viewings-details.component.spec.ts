import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewingsDetailsComponent } from './viewings-details.component';

describe('ViewingsDetailsComponent', () => {
  let component: ViewingsDetailsComponent;
  let fixture: ComponentFixture<ViewingsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewingsDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewingsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

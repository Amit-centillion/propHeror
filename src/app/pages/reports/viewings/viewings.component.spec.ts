import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewingsComponent } from './viewings.component';

describe('ViewingsComponent', () => {
  let component: ViewingsComponent;
  let fixture: ComponentFixture<ViewingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

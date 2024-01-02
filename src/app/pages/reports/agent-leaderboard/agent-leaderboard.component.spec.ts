import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentLeaderboardComponent } from './agent-leaderboard.component';

describe('AgentLeaderboardComponent', () => {
  let component: AgentLeaderboardComponent;
  let fixture: ComponentFixture<AgentLeaderboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentLeaderboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentLeaderboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

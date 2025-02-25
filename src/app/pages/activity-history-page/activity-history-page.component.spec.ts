import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityHistoryPageComponent } from './activity-history-page.component';

describe('ActivityHistoryPageComponent', () => {
  let component: ActivityHistoryPageComponent;
  let fixture: ComponentFixture<ActivityHistoryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivityHistoryPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActivityHistoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesAssistantPageComponent } from './sales-assistant-page.component';

describe('SalesAssistantPageComponent', () => {
  let component: SalesAssistantPageComponent;
  let fixture: ComponentFixture<SalesAssistantPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesAssistantPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SalesAssistantPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

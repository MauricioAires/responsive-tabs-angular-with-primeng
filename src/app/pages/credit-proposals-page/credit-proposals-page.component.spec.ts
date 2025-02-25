import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditProposalsPageComponent } from './credit-proposals-page.component';

describe('CreditProposalsPageComponent', () => {
  let component: CreditProposalsPageComponent;
  let fixture: ComponentFixture<CreditProposalsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreditProposalsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreditProposalsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

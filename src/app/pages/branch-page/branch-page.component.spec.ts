import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchPageComponent } from './branch-page.component';

describe('BranchPageComponent', () => {
  let component: BranchPageComponent;
  let fixture: ComponentFixture<BranchPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BranchPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BranchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessInformationPageComponent } from './access-information-page.component';

describe('AccessInformationPageComponent', () => {
  let component: AccessInformationPageComponent;
  let fixture: ComponentFixture<AccessInformationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccessInformationPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccessInformationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

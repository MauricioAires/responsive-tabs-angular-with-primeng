import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralInformationPageComponent } from './general-information-page.component';

describe('GeneralInformationPageComponent', () => {
  let component: GeneralInformationPageComponent;
  let fixture: ComponentFixture<GeneralInformationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneralInformationPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GeneralInformationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

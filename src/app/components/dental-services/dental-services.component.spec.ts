import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DentalServicesComponent } from './dental-services.component';

describe('DentalServicesComponent', () => {
  let component: DentalServicesComponent;
  let fixture: ComponentFixture<DentalServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DentalServicesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DentalServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

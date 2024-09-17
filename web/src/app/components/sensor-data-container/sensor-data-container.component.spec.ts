import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorDataContainerComponent } from './sensor-data-container.component';

describe('SensorDataContainerComponent', () => {
  let component: SensorDataContainerComponent;
  let fixture: ComponentFixture<SensorDataContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SensorDataContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SensorDataContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

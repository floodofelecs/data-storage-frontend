import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSensorDataComponent } from './new-sensordata.component';

describe('NewSensorDataComponent', () => {
  let component: NewSensorDataComponent;
  let fixture: ComponentFixture<NewSensorDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewSensorDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSensorDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

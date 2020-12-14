import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorDataListComponent } from './sensordata-list.component';

describe('SensorDataListComponent', () => {
  let component: SensorDataListComponent;
  let fixture: ComponentFixture<SensorDataListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SensorDataListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SensorDataListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

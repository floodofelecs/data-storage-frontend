import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensordataListComponent } from './sensordata-list.component';

describe('SensordataListComponent', () => {
  let component: SensordataListComponent;
  let fixture: ComponentFixture<SensordataListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SensordataListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SensordataListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

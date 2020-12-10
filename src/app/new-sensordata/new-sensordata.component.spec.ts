import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSensordataComponent } from './new-sensordata.component';

describe('NewSensordataComponent', () => {
  let component: NewSensordataComponent;
  let fixture: ComponentFixture<NewSensordataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewSensordataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSensordataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

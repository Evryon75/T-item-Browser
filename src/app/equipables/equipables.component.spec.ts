import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipablesComponent } from './equipables.component';

describe('EquipablesComponent', () => {
  let component: EquipablesComponent;
  let fixture: ComponentFixture<EquipablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipablesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

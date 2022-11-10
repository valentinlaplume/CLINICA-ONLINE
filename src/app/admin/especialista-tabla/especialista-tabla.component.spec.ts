import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspecialistaTablaComponent } from './especialista-tabla.component';

describe('EspecialistaTablaComponent', () => {
  let component: EspecialistaTablaComponent;
  let fixture: ComponentFixture<EspecialistaTablaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EspecialistaTablaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EspecialistaTablaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

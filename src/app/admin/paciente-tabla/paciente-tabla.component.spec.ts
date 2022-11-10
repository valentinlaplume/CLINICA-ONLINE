import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacienteTablaComponent } from './paciente-tabla.component';

describe('PacienteTablaComponent', () => {
  let component: PacienteTablaComponent;
  let fixture: ComponentFixture<PacienteTablaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PacienteTablaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PacienteTablaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

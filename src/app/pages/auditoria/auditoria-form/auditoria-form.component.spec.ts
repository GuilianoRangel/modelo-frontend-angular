import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditoriaFormComponent } from './auditoria-form.component';

describe('AuditoriaFormComponent', () => {
  let component: AuditoriaFormComponent;
  let fixture: ComponentFixture<AuditoriaFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditoriaFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditoriaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ListAuditoriaComponent } from './list-auditoria.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';


describe('List', () => {
  let component: ListAuditoriaComponent;
  let fixture: ComponentFixture<ListAuditoriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAuditoriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAuditoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

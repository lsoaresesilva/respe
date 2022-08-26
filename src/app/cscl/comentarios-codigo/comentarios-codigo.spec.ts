import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ComentariosCodigoComponent } from './comentarios-codigo';

describe('CriarComentarioComponent', () => {
  let component: ComentariosCodigoComponent;
  let fixture: ComponentFixture<ComentariosCodigoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ComentariosCodigoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComentariosCodigoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CadastrarQuestoesComponent } from './cadastrar-questoes.component';



describe('CadastrarQuestoesComponent', () => {
  let component: CadastrarQuestoesComponent;
  let fixture: ComponentFixture<CadastrarQuestoesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastrarQuestoesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrarQuestoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

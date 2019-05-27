import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarQuestoesFechadasComponent } from './cadastrar-questoes-fechadas.component';

describe('CadastrarQuestoesFechadasComponent', () => {
  let component: CadastrarQuestoesFechadasComponent;
  let fixture: ComponentFixture<CadastrarQuestoesFechadasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastrarQuestoesFechadasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrarQuestoesFechadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

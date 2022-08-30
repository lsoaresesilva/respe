import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CadastrarQuestoesFechadasComponent } from './cadastrar-questoes-fechadas.component';

describe('CadastrarQuestoesFechadasComponent', () => {
  let component: CadastrarQuestoesFechadasComponent;
  let fixture: ComponentFixture<CadastrarQuestoesFechadasComponent>;

  beforeEach(waitForAsync(() => {
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

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarQuestaoRegexComponent } from './cadastrar-questao-regex.component';

describe('CadastrarQuestaoRegexComponent', () => {
  let component: CadastrarQuestaoRegexComponent;
  let fixture: ComponentFixture<CadastrarQuestaoRegexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastrarQuestaoRegexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrarQuestaoRegexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FelicitacoesComponent } from './felicitacoes.component';

describe('FelicitacoesComponent', () => {
  let component: FelicitacoesComponent;
  let fixture: ComponentFixture<FelicitacoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FelicitacoesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FelicitacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

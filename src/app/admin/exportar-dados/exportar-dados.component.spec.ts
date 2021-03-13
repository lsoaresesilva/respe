import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportarDadosComponent } from './exportar-dados.component';

describe('ExportarDadosComponent', () => {
  let component: ExportarDadosComponent;
  let fixture: ComponentFixture<ExportarDadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExportarDadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportarDadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressoQuestoesAbertasComponent } from './progresso-questoes-abertas.component';

describe('ProgressoQuestoesAbertasComponent', () => {
  let component: ProgressoQuestoesAbertasComponent;
  let fixture: ComponentFixture<ProgressoQuestoesAbertasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgressoQuestoesAbertasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressoQuestoesAbertasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

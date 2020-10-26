import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TentativaQuestoesComponent } from './tentativa-questoes.component';

describe('TentativaQuestoesComponent', () => {
  let component: TentativaQuestoesComponent;
  let fixture: ComponentFixture<TentativaQuestoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TentativaQuestoesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TentativaQuestoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

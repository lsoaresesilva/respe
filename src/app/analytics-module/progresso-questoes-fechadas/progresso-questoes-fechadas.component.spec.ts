import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressoQuestoesFechadasComponent } from './progresso-questoes-fechadas.component';

describe('ProgressoQuestoesFechadasComponent', () => {
  let component: ProgressoQuestoesFechadasComponent;
  let fixture: ComponentFixture<ProgressoQuestoesFechadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgressoQuestoesFechadasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressoQuestoesFechadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListarQuestoesFechadasComponent } from './listar-questoes-fechadas.component';

describe('ListarQuestoesFechadasComponent', () => {
  let component: ListarQuestoesFechadasComponent;
  let fixture: ComponentFixture<ListarQuestoesFechadasComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarQuestoesFechadasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarQuestoesFechadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

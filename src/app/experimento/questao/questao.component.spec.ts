import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { QuestaoComponent } from './questao.component';

describe('QuestaoComponent', () => {
  let component: QuestaoComponent;
  let fixture: ComponentFixture<QuestaoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoreflexaoComponent } from './autoreflexao.component';

describe('AutoreflexaoComponent', () => {
  let component: AutoreflexaoComponent;
  let fixture: ComponentFixture<AutoreflexaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoreflexaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoreflexaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

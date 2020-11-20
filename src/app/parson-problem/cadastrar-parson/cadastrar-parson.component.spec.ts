import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarParsonComponent } from './cadastrar-parson.component';

describe('CadastrarParsonComponent', () => {
  let component: CadastrarParsonComponent;
  let fixture: ComponentFixture<CadastrarParsonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastrarParsonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrarParsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

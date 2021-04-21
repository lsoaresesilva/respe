import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarVideosComponent } from './listar-videos.component';

describe('ListarVideosComponent', () => {
  let component: ListarVideosComponent;
  let fixture: ComponentFixture<ListarVideosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarVideosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

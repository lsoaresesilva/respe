import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaSubmissoesAcertoComponent } from './media-submissoes-acerto.component';

describe('MediaSubmissoesAcertoComponent', () => {
  let component: MediaSubmissoesAcertoComponent;
  let fixture: ComponentFixture<MediaSubmissoesAcertoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediaSubmissoesAcertoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaSubmissoesAcertoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

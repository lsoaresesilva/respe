import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CabecachoChatComponent } from './cabecacho-chat.component';

describe('CabecachoChatComponent', () => {
  let component: CabecachoChatComponent;
  let fixture: ComponentFixture<CabecachoChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CabecachoChatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CabecachoChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

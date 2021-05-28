import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockableContainerComponent } from './blockable-container.component';

describe('BlockableContainerComponent', () => {
  let component: BlockableContainerComponent;
  let fixture: ComponentFixture<BlockableContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlockableContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockableContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

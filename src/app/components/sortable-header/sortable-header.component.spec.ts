import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortableHeaderComponent } from './sortable-header.component';

describe('SortableHeaderComponent', () => {
  let component: SortableHeaderComponent;
  let fixture: ComponentFixture<SortableHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SortableHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SortableHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DasboardhUpdateComponent } from './dasboardh-update.component';

describe('DasboardhUpdateComponent', () => {
  let component: DasboardhUpdateComponent;
  let fixture: ComponentFixture<DasboardhUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DasboardhUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DasboardhUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

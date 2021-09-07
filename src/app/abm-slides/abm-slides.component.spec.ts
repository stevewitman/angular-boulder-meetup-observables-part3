import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmSlidesComponent } from './abm-slides.component';

describe('AbmSlidesComponent', () => {
  let component: AbmSlidesComponent;
  let fixture: ComponentFixture<AbmSlidesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbmSlidesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbmSlidesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

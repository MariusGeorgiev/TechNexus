import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HardwareArticlesComponent } from './hardware-articles.component';

describe('HardwareArticlesComponent', () => {
  let component: HardwareArticlesComponent;
  let fixture: ComponentFixture<HardwareArticlesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HardwareArticlesComponent]
    });
    fixture = TestBed.createComponent(HardwareArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

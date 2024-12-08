import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScienceArticlesComponent } from './science-articles.component';

describe('ScienceArticlesComponent', () => {
  let component: ScienceArticlesComponent;
  let fixture: ComponentFixture<ScienceArticlesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScienceArticlesComponent]
    });
    fixture = TestBed.createComponent(ScienceArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoftwareArticlesComponent } from './software-articles.component';

describe('SoftwareArticlesComponent', () => {
  let component: SoftwareArticlesComponent;
  let fixture: ComponentFixture<SoftwareArticlesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SoftwareArticlesComponent]
    });
    fixture = TestBed.createComponent(SoftwareArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

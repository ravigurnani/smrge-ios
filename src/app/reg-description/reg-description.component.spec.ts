import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegDescriptionComponent } from './reg-description.component';

describe('RegDescriptionComponent', () => {
  let component: RegDescriptionComponent;
  let fixture: ComponentFixture<RegDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegDescriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

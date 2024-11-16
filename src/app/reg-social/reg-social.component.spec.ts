import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegSocialComponent } from './reg-social.component';

describe('RegSocialComponent', () => {
  let component: RegSocialComponent;
  let fixture: ComponentFixture<RegSocialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegSocialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegSocialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

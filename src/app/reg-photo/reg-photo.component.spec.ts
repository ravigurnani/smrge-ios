import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegPhotoComponent } from './reg-photo.component';

describe('RegPhotoComponent', () => {
  let component: RegPhotoComponent;
  let fixture: ComponentFixture<RegPhotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegPhotoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

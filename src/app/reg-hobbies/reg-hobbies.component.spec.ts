import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegHobbiesComponent } from './reg-hobbies.component';

describe('RegHobbiesComponent', () => {
  let component: RegHobbiesComponent;
  let fixture: ComponentFixture<RegHobbiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegHobbiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegHobbiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

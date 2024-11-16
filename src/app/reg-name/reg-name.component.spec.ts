import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegNameComponent } from './reg-name.component';

describe('RegNameComponent', () => {
  let component: RegNameComponent;
  let fixture: ComponentFixture<RegNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegNameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

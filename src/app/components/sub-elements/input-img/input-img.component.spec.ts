import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputImgComponent } from './input-img.component';

describe('InputImgComponent', () => {
  let component: InputImgComponent;
  let fixture: ComponentFixture<InputImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputImgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

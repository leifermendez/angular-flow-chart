import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowCardNodeComponent } from './flow-card-node.component';

describe('FlowCardNodeComponent', () => {
  let component: FlowCardNodeComponent;
  let fixture: ComponentFixture<FlowCardNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlowCardNodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowCardNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

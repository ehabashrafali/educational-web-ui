import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorPolicyComponent } from './instructor-policy.component';

describe('InstructorPolicyComponent', () => {
  let component: InstructorPolicyComponent;
  let fixture: ComponentFixture<InstructorPolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstructorPolicyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstructorPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

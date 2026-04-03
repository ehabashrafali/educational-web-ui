import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentPolicyComponent } from './student-policy.component';

describe('StudentPolicyComponent', () => {
  let component: StudentPolicyComponent;
  let fixture: ComponentFixture<StudentPolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentPolicyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

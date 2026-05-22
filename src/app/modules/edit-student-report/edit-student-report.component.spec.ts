import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStudentReportComponent } from './edit-student-report.component';

describe('EditStudentReportComponent', () => {
  let component: EditStudentReportComponent;
  let fixture: ComponentFixture<EditStudentReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditStudentReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditStudentReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

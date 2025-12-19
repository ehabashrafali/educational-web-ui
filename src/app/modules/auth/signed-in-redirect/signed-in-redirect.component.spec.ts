import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignedInRedirectComponent } from './signed-in-redirect.component';

describe('SignedInRedirectComponent', () => {
  let component: SignedInRedirectComponent;
  let fixture: ComponentFixture<SignedInRedirectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignedInRedirectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignedInRedirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

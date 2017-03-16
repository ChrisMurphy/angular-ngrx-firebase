import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';

import { FormComponent } from './form.component';
import { EmailPasswordCredentials } from '../../models/email-password-credentials';

describe('Component: Auth Form', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(async(() => {
    // refine the test module by declaring the test component
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, MaterialModule],
      declarations: [FormComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    // create component and test fixture
    fixture = TestBed.createComponent(FormComponent);
    // get test component from the fixture
    component = fixture.componentInstance;
    // trigger the ngOnInit lifecycle function
    fixture.detectChanges();
  });

  it('should create a component instance', () => {
    expect(component).toBeTruthy();
  });

  it('should create a FormGroup', () => {
    expect(component.credentials instanceof FormGroup).toBe(true);
  });

  it('should create a FormControl for each credential model property', () => {
    expect(Object.keys(component.credentials.controls)).toEqual([
      'email', 'password'
    ]);
  });

  it('should mark form invalid when empty', () => {
    expect(component.credentials.valid).toBeFalsy();
  });

  it('should mark email field invalid when empty', () => {
    let email = component.credentials.controls['email'];
    let errors = email.errors || {};

    expect(email.valid).toBeFalsy();
    expect(errors['required']).toBeTruthy();
  });

  it('should mark email field invalid when not an email address', () => {
    let email = component.credentials.controls['email'];
    email.setValue("not-an-email");
    let errors = email.errors || {};

    expect(email.valid).toBeFalsy();
    expect(errors['simpleEmailRule']).toBeTruthy();
  });

  it('should mark password field invalid when empty', () => {
    let email = component.credentials.controls['password'];
    let errors = email.errors || {};

    expect(email.valid).toBeFalsy();
    expect(errors['required']).toBeTruthy();
  });

  it('should submit the form and emit credentials', () => {
    expect(component.credentials.valid).toBeFalsy();
    component.credentials.controls['email'].setValue("test@test.com");
    component.credentials.controls['password'].setValue("123456789");
    expect(component.credentials.valid).toBeTruthy();

    let eventOutput: EmailPasswordCredentials;
    // Subscribe to the Observable and store the credentials in a local variable.
    component.authEvent.subscribe((value) => eventOutput = value);

    // Trigger the login function, assume ngSubmit is fine (Angular)
    component.onSubmit();

    // Now we can check to make sure the emitted value is correct
    expect(eventOutput.email).toBe("test@test.com");
    expect(eventOutput.password).toBe("123456789");
  });
});

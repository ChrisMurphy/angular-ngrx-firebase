import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormComponent } from './form.component';

describe('Component: Auth Form', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(async(() => {
    // Refine the test module by declaring the test component and dependencies
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, MaterialModule, BrowserAnimationsModule],
      declarations: [FormComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    // Create component and test fixture
    fixture = TestBed.createComponent(FormComponent);
    // Get test component from the fixture
    component = fixture.componentInstance;
    // Trigger the ngOnInit lifecycle function
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

    email.markAsTouched();
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#emailRequired').innerHTML).toBe('email address is required');
  });

  it('should mark email field invalid when not an email address', () => {
    let email = component.credentials.controls['email'];
    email.setValue("not-an-email");
    let errors = email.errors || {};

    expect(email.valid).toBeFalsy();
    expect(errors['simpleEmailRule']).toBeTruthy();

    email.markAsTouched();
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#emailFormat').innerHTML).toBe('email address appears incorrect');    
  });

  it('should mark password field invalid when empty', () => {
    let email = component.credentials.controls['password'];
    let errors = email.errors || {};

    expect(email.valid).toBeFalsy();
    expect(errors['required']).toBeTruthy();

    email.markAsTouched();
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#passwordRequired').innerHTML).toBe('password is required');    
  });

  it('should submit the form and emit credentials', () => {
    // Form should be invalid
    expect(component.credentials.valid).toBeFalsy();
    // Set valid form values
    component.credentials.controls['email'].setValue('test@test.com');
    component.credentials.controls['password'].setValue('123456789');
    // Form should be valid
    expect(component.credentials.valid).toBeTruthy();

    // Spy on the authEvent emitter
    spyOn(component.authEvent, 'emit');

    // Trigger the login function, assume ngSubmit is fine (Angular)
    component.onSubmit();

    // Now we can check authEvent has been called with correct payload
    expect(component.authEvent.emit).toHaveBeenCalledTimes(1);
    expect(component.authEvent.emit).toHaveBeenCalledWith(
      {email:'test@test.com', password: '123456789'}
    );
  });

  it('should submit the form but not emit credentials if form invalid', () => {
    // Form should be invalid
    expect(component.credentials.valid).toBeFalsy();

    // Spy on the authEvent emitter
    spyOn(component.authEvent, 'emit');

    // Trigger the login function, assume ngSubmit is fine (Angular)
    component.onSubmit();

    // Now we can check authEvent hasn't been called
    expect(component.authEvent.emit).toHaveBeenCalledTimes(0);
  });
});

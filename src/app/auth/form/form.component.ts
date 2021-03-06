import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';

import { EmailValidators } from 'ng2-validators';

import { EmailPasswordCredentials } from '../../models/email-password-credentials';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @ViewChild('form') form: NgForm;
  @Output() authEvent: EventEmitter<EmailPasswordCredentials>;
  public credentials: FormGroup;
  public submitted: boolean;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.authEvent = new EventEmitter<EmailPasswordCredentials>();
  }

  ngOnInit() {
    this.submitted = false;
    this.credentials = this.buildForm();
  }

  private buildForm(): FormGroup {
    return this.formBuilder.group({
      email: [null, Validators.compose([Validators.required, EmailValidators.simple])],
      password: [null, Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.credentials.valid) {
      this.authEvent.emit(this.credentials.value);
    }
  }
}

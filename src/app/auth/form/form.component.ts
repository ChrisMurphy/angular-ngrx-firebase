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
  @Output() credentials: EventEmitter<EmailPasswordCredentials>;
  public credentialsGroup: FormGroup;
  public submitted: boolean;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.credentials = new EventEmitter<EmailPasswordCredentials>();
  }

  ngOnInit() {
    this.submitted = false;

    this.credentialsGroup = this.formBuilder.group({
      email: [null, Validators.compose([Validators.required, EmailValidators.simple])],
      password: [null, Validators.required]
    });
  }

  submit(formValues: EmailPasswordCredentials, isValid: boolean) {
    this.submitted = true;

    if (isValid) {
      this.credentials.emit(formValues);
    }
  }
}
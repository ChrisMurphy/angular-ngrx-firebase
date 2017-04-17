import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { SocialComponent } from './social.component';
import { AuthProviders } from 'angularfire2';

describe('SocialComponent', () => {
  let component: SocialComponent;
  let fixture: ComponentFixture<SocialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SocialComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create a component instance', () => {
    expect(component).toBeTruthy();
  });

  it('should emit a google auth event', () => {
    // Spy on the authEvent emitter
    spyOn(component.authEvent, 'emit');

    // Click the google social auth button
    fixture.nativeElement.querySelectorAll('#googleSocial')[0].click();

    // Now we can check authEvent has been called with correct payload
    expect(component.authEvent.emit).toHaveBeenCalledTimes(1);
    expect(component.authEvent.emit).toHaveBeenCalledWith(AuthProviders.Google);
  });

  it('should emit a facebook auth event', () => {
    // Spy on the authEvent emitter
    spyOn(component.authEvent, 'emit');

    // Click the facebook social auth button
    fixture.nativeElement.querySelectorAll('#facebookSocial')[0].click();

    // Now we can check authEvent has been called with correct payload
    expect(component.authEvent.emit).toHaveBeenCalledTimes(1);
    expect(component.authEvent.emit).toHaveBeenCalledWith(AuthProviders.Facebook);
  });

  it('should emit a twitter auth event', () => {
    // Spy on the authEvent emitter
    spyOn(component.authEvent, 'emit');

    // Click the twitter social auth button
    fixture.nativeElement.querySelectorAll('#twitterSocial')[0].click();

    // Now we can check authEvent has been called with correct payload
    expect(component.authEvent.emit).toHaveBeenCalledTimes(1);
    expect(component.authEvent.emit).toHaveBeenCalledWith(AuthProviders.Twitter);
  });

  it('should emit a github auth event', () => {
    // Spy on the authEvent emitter
    spyOn(component.authEvent, 'emit');

    // Click the github social auth button
    fixture.nativeElement.querySelectorAll('#githubSocial')[0].click();

    // Now we can check authEvent has been called with correct payload
    expect(component.authEvent.emit).toHaveBeenCalledTimes(1);
    expect(component.authEvent.emit).toHaveBeenCalledWith(AuthProviders.Github);
  });
});

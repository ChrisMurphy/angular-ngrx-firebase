import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthProviders } from 'angularfire2';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.scss']
})
export class SocialComponent implements OnInit {
  @Input() authenticating: boolean;
  @Output() authEvent: EventEmitter<AuthProviders>;
  providers: typeof AuthProviders = AuthProviders;

  constructor() {
    this.authEvent = new EventEmitter<AuthProviders>();
  }

  ngOnInit() {
  }

  raiseEvent(provider: AuthProviders){
    this.authEvent.emit(provider);
  }

}

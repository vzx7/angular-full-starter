import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-main',
  styleUrls: ['./auth-main.component.scss'],
  template: '<app-auth-head></app-auth-head><router-outlet></router-outlet>'
})
export class AuthMainComponent implements OnInit {

  constructor() { }

  public ngOnInit() { }

}

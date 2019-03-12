import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-body-autorization',
  templateUrl: './body-autorization.component.html',
  styleUrls: ['./body-autorization.component.scss']
})
export class BodyAutorizationComponent implements OnInit {

  // form: FormGroup;

  constructor(
    // private formBuilder: FormBuilder
  ) {
  }

  public ngOnInit() {
    // this.form = this.formBuilder.group({
    //     email: '',
    //     password: '',
    // });
  }

}

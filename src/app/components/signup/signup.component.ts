import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder} from '@angular/forms';

import { PasswordValidator } from '../../passwordValidator';
import { LoginService } from '../../login.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'signup',
  templateUrl: 'signup.component.html',
})
export class SignupComponent {

    form: FormGroup;
    invalidErrorMessage;

    constructor(fb: FormBuilder, private _loginService: LoginService, private _route: ActivatedRoute) {
        this.form = fb.group({
            username: ['', Validators.required],
            password: ['', Validators.compose([ Validators.required, PasswordValidator.cannotContainSpace ])]
        });
    }

    ngOnInit() {
        //retrieve invalid loggin message
        this._route.params.subscribe(params => {
            this.invalidErrorMessage = params["invalidLoginMessage"];
        });
    }

    onSignup() {
        //login with the user input
        var result = this._loginService.signup(
            this.form.controls['username'].value,
            this.form.controls['password'].value
        );
    }
}

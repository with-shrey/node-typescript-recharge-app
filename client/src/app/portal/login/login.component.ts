import {Component, OnInit} from '@angular/core';
import {UserService} from '../../shared/services/user.service';
import {AuthService} from '../../shared/services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../../../common/model/User';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    loading: boolean;
    submitted: boolean = false;
    credentialsVerified: boolean;
    returnUrl: string;
    error: boolean= false;
    username: string;


    user: User[];

    constructor(private userService: UserService,
                private authService: AuthService,
                private route: ActivatedRoute,
                private router: Router,
                private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            userName: ['', Validators.required],
            password: ['', Validators.required]
        });

        this.credentialsVerified = false;
        this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/portal';
    }

    public findInvalidControls() {
        const invalid = [];
        const controls = this.loginForm.controls;
        for (const name in controls) {
            if (controls[name].invalid) {
                invalid.push(name);
            }
        }
        return invalid;
    }

    get f(){
        return this.loginForm.controls;
    }
    
    onSubmit() {
        if (this.findInvalidControls().length) {
            return;
        }
        this.error = null;
        this.submitted = true;
        this.loading = true;
        this.username = this.loginForm.get('userName').value;
        this.userService.login(this.username, this.loginForm.get('password').value)
            .subscribe(data => {
                this.credentialsVerified = true;
                this.loading = false;
            }, error => {
                this.error = error;
                console.log(error);
                this.loading = false;

            });
    }
    
    onLoginSuccess() {

        this.error = true;
        this.router.navigate([this.returnUrl]);
    }
}

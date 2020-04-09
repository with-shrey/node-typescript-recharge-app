import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserService} from '../../../shared/services/user.service';
import {AuthService} from '../../../shared/services/auth.service';

@Component({
  selector: 'app-otp-form',
  templateUrl: './otp-form.component.html',
  styleUrls: ['../login.component.scss']
})
export class OtpFormComponent implements OnInit {
  @Output()
  loginSuccess = new EventEmitter();
  @Input()
  userName: string;
    otp: string;
    loading: boolean = false;

  constructor(private userService: UserService, private authService: AuthService) {
  }

  ngOnInit() {
  }

  verifyOtp() {
      this.loading = true;
      this.userService.verifyOtp(this.userName, this.otp)
          .subscribe(data => {
              this.authService.setToken(data);
              this.loginSuccess.emit();
              this.loading = false;
          }, error => {
              this.loading = false;
          });
  }
}

import { Component } from '@angular/core';
import { AuthService } from '../../app/auth/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  username = '';
  password = '';
  loginFailed = false;

  constructor(private authService: AuthService) {}

  login(): void {
    this.authService.login(this.username, this.password)
      .subscribe(success => {
        this.loginFailed = !success;
      });
  }
}

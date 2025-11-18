import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../services/login-service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    RouterLink
  ],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css'
})
export class LoginComponent {
  username: string;
  password: string;

  constructor(
    private loginService: LoginService,
    private router: Router
  ){}

  login(){
    this.loginService.login(this.username, this.password).subscribe(data => {
      // console.log('Login successful', data);
      sessionStorage.setItem(environment.TOKEN_NAME, data.access_token);

      this.router.navigate(['/pages/dashboard']);
    });
  }
}

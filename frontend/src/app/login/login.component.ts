import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
// @ts-ignore
import { MsalService, EventMessage, EventType, PopupRequest } from '@azure/msal-angular';
import { InteractionStatus } from '@azure/msal-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  error = '';
  signInResultMessage = '';

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private msalService: MsalService) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.error = '';

    const { username, password } = this.loginForm.value;
    this.authService.login(username, password).subscribe(
      (response) => {
        this.loading = false;
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        console.log(error);
        this.loading = false;
        this.error = 'Invalid username or password';
      }
    );
  }

  signInWithAzure() {
    const loginRequest: PopupRequest = {
      scopes: ['openid', 'profile', 'email'],
    };

    this.msalService.loginPopup(loginRequest).subscribe({
      next: (result) => {
        const idToken = result.idToken;
        console.log('Azure AD User:', idToken);
        this.authService.azureLogin(idToken).subscribe(
          (result) => {
            this.signInResultMessage = result.message;
            this.router.navigate(['/dashboard']);
          },
          (error) => {
            console.log(error)
            this.signInResultMessage = 'Error signing in with Azure SSO';
          }
        );
      },
      error: (error) => {
        console.log(error)
        this.signInResultMessage = 'Error signing in with Azure SSO';
      },
    });
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/services';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
})
export class SigninComponent implements OnInit, OnDestroy {
  signinForm!: FormGroup;
  httpError: any;
  isLoading!: boolean;

  private authSubscription!: Subscription;

  constructor(private authSer: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.signinForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    if (this.signinForm.valid) {
      const body = this.signinForm.value;
      this.isLoading = true;
      this.authSubscription = this.authSer
        .signin(body.email, body.password)
        .subscribe({
          next: (data) => {
            localStorage.setItem('token', data['access_token']);
            localStorage.setItem('user_email', data['user'].email);
            this.isLoading = false;
            this.router.navigate(['users']);
          },
          error: ({ error }) => {
            this.httpError = error;
            this.isLoading = false;
          },
          complete: () => {
            this.isLoading = false;
          },
        });
    }
  }

  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
  }
}

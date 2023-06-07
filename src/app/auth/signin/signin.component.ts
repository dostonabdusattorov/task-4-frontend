import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/services';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
})
export class SigninComponent implements OnInit {
  signinForm!: FormGroup;
  httpError: any;
  isLoading!: boolean;

  constructor(private authSer: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.signinForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    this.isLoading = false;

    if (this.signinForm.valid) {
      const body = this.signinForm.value;
      this.authSer.signin(body.email, body.password).subscribe({
        next: (data) => {
          localStorage.setItem('token', data['access_token']);
          localStorage.setItem('user_email', data['user'].email);
          this.isLoading = true;
          this.router.navigate(['users']);
        },
        error: ({ error }) => {
          this.httpError = error;
        },
      });
    }
  }
}

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
      this.authSer.signin(body.email, body.password).subscribe({
        next: (data) => {
          localStorage.setItem('token', data['access_token']);
          this.router.navigate(['users']);
        },
        error: ({ error }) => {
          this.httpError = error;
        },
      });
    }
  }
}

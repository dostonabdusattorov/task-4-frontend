import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/services';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
})
export class SignupComponent {
  signupForm!: FormGroup;
  isLoading!: boolean;
  httpError: any;

  constructor(private authSer: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const body = this.signupForm.value;
      this.isLoading = true;
      this.authSer.signup(body.name, body.email, body.password).subscribe({
        next: () => {
          this.httpError = null;
          this.router.navigate(['auth/signin']);
          this.isLoading = false;
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
}

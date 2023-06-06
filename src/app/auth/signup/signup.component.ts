import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/services';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
})
export class SignupComponent {
  signupForm!: FormGroup;

  constructor(private authSer: AuthService) {}

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    console.log('submit');

    if (this.signupForm.valid) {
      const body = this.signupForm.value;
      this.authSer
        .signup(body.name, body.email, body.password)
        .subscribe((data) => {
          console.log(data);
        });
    }
  }
}

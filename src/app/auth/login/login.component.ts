import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';  // Import AuthService
import { Router } from '@angular/router';

interface LoginFormData {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  login() {
    if (this.form.valid) {
      const formData: LoginFormData = this.form.value;
      const { email, password } = formData;

      this.authService.login(email, password)
        .then((userCredential) => {
          console.log('User logged in:', userCredential.user);
          alert('Login successful!');
          this.router.navigate(['/']);
        })
        .catch((error) => {
          console.error('Login error:', error.message);
          alert(error.message);
        });
    } else {
      console.log('Form is invalid');
    }
  }
}

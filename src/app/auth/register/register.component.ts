import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';  // Import AuthService
import { Router } from '@angular/router';

interface RegisterFormData {
  username: string;
  email: string;
  tel: string;
  passGroup: {
    password: string;
    rePassword: string;
  };
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form: FormGroup;
  message: string = ''; 
  showMessage: boolean = false;
  isLoading: boolean = false;
  isFormVisible: boolean = true;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      tel: ['', [Validators.required, Validators.pattern(/^[0-9]{9}$/)]],
      passGroup: this.fb.group(
        {
          password: ['', [Validators.required, Validators.minLength(5)]],
          rePassword: ['', Validators.required]
        },
        { validators: this.matchPasswordsValidator }
      )
    });
  }

  get passGroup() {
    return this.form.get('passGroup');
  }

  matchPasswordsValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const rePassword = group.get('rePassword')?.value;
    return password === rePassword ? null : { matchPasswordsValidator: true };
  }

  register() {
    if (this.form.valid) {
      this.isFormVisible = false;

      const formData: RegisterFormData = this.form.value;
      const { email, passGroup, username, tel } = formData;
      const password = passGroup.password;

      // Use AuthService's register method instead of Firebase's method directly
      this.authService.register(username, email, tel, password)
        .then(() => {
          console.log('User registered and logged in');
          this.message = 'Registration and login successful!';
          this.showMessage = true;

          this.isLoading = true;

          setTimeout(() => {
            this.router.navigate(['/']);
            this.showMessage = false;
            this.isLoading = false;
          }, 2000);
        })
        .catch((error) => {
          console.error('Registration error:', error.message);
          alert(error.message);
        });
    } else {
      console.log('Form is invalid');
    }
  }
}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

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

  constructor(private fb: FormBuilder) {
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
      const formData: RegisterFormData = this.form.value;
      const { email, passGroup } = formData;
      const password = passGroup.password;

      const auth = getAuth();
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log('User registered:', userCredential.user);
          alert('Registration successful!');
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

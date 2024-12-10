import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';


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

  constructor(private fb: FormBuilder, private router: Router) {
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
      const { email, passGroup, username, tel } = formData;
      const password = passGroup.password;

      const auth = getAuth();
      const db = getFirestore();

      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log('User registered:', userCredential.user);

          // Store additional user data in Firestore
          const userRef = doc(db, 'users', userCredential.user.uid);
          setDoc(userRef, {
            username: username,
            tel: tel
          }).then(() => {
            console.log('User additional info saved to Firestore');
            alert('Registration successful!');
            this.router.navigate(['/']);
          }).catch((error) => {
            console.error('Error saving user data:', error);
          });
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

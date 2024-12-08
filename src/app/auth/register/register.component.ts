import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
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
  message: string = ''; 
  showMessage: boolean = false;
  isLoading: boolean = false;
  isFormVisible: boolean = true;

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

      this.isFormVisible = false;


      const formData: RegisterFormData = this.form.value;
      const { email, passGroup, username, tel } = formData;
      const password = passGroup.password;

      const auth = getAuth();
      const db = getFirestore();

      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log('User registered:', userCredential.user);

          const userRef = doc(db, 'users', userCredential.user.uid);
          setDoc(userRef, {
            username: username,
            tel: tel

          }).then(() => {
            console.log('User additional info saved to Firestore');

        
            signInWithEmailAndPassword(auth, email, password)
            .then((signInCredential) => {
              console.log('User logged in:', signInCredential.user);
              
              this.message = 'Registration and login successful!';
              this.showMessage = true;

              this.isLoading = true;

              
              setTimeout(() => {
                this.router.navigate(['/']);
                this.showMessage = false; 
                this.isLoading = false; 
              }, 2000); 
              
            });

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

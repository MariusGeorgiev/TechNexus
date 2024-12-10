import { Injectable } from '@angular/core';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject: BehaviorSubject<any> = new BehaviorSubject(null); // Observable user data
  user$ = this.userSubject.asObservable();

  constructor(private router: Router) {
    // Check if the user is already logged in
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // Fetch user data from Firestore when the user is logged in
        this.fetchUserData(user.uid);
      } else {
        this.userSubject.next(null); // If no user is logged in, set user data to null
      }
    });
  }

  // Login Method
  login(email: string, password: string) {
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // Fetch user data after login
        this.fetchUserData(user.uid);
        return userCredential; // Return the userCredential so you can log it in your component
      });
  }

  // Register Method
  register(username: string, email: string, tel: string, password: string) {
    const auth = getAuth();
    const db = getFirestore();

    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // Save user details to Firestore
        const userRef = doc(db, 'users', user.uid);
        return setDoc(userRef, { username, email, tel });
      });
  }

  // Fetch User Data from Firestore
  private fetchUserData(uid: string) {
    const db = getFirestore();
    const userRef = doc(db, 'users', uid);

    getDoc(userRef).then((docSnap) => {
      if (docSnap.exists()) {
        const userData = docSnap.data();
        this.userSubject.next({
          uid,
          username: userData['username'],  // Use bracket notation
          email: userData['email'],        // Use bracket notation
          tel: userData['tel']             // Use bracket notation
        });
      } else {
        console.log('No such user!');
        this.userSubject.next(null);
      }
    }).catch((error) => {
      console.log('Error fetching user data:', error);
      this.userSubject.next(null);
    });
  }

  // Get Current User (Observable)
  getCurrentUser() {
    return this.userSubject.asObservable();
  }

  // Logout Method
  logout() {
    const auth = getAuth();
    return signOut(auth).then(() => {
      this.userSubject.next(null); // Clear user data
      this.router.navigate(['/login']); // Redirect to login
    });
  }
}

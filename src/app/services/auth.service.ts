import { Injectable } from '@angular/core';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject: BehaviorSubject<any> = new BehaviorSubject(null); 
  user$ = this.userSubject.asObservable();

  constructor(private router: Router) {
  const auth = getAuth();
    

    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.fetchUserData(user.uid); 
      } else {
        this.userSubject.next(null); 
      }
    });
  }



  login(email: string, password: string) {
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        
        this.fetchUserData(user.uid);
        return userCredential; 
      });
  }


  register(username: string, email: string, tel: string, password: string) {
    const auth = getAuth();
    const db = getFirestore();

    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // Save user details to Firestore
        const userRef = doc(db, 'users', user.uid);

        const now = new Date();
        const registeredOn = now.toISOString();

        return setDoc(userRef, { username, email, tel, registeredOn });
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
          username: userData['username'],  
          email: userData['email'],        
          tel: userData['tel']             
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

  // get user data from firebase authentication
  getCurrentUser() {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      console.log('Current user:', { email: user.email, uid: user.uid });
      return { email: user.email, uid: user.uid };
    } else {
      console.log('No user logged in');
      return null; 
    }
  }

  getUserEmail() {
    const user = this.getCurrentUser();
    return user ? user.email : null; 
  }

  // get user data from firestore users collection
  getCurrentCollectionUser() {
    console.log("Get current user", this.userSubject.getValue());
    return this.userSubject.getValue();
  }

  
  logout() {
    const auth = getAuth();
    return signOut(auth).then(() => {
      this.userSubject.next(null);
      this.router.navigate(['/login']); 
    });
  }

    checkLoginStatus(): Observable<boolean> {
      const user = getAuth().currentUser; 
      return of(!!user); 
    }

}

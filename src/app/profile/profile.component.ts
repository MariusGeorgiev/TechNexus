import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { AuthService } from '../services/auth.service';
import { getFirestore, collection, query, where, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Router } from '@angular/router';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})


export class ProfileComponent implements OnInit {
  userId: string = '';
  userData: any = {};
  newAge: string = '';
  newGender: string = '';
  newUsername: string = '';
  newTel: string = '';
  imagePreview: string | undefined;
  selectedImage: File | null = null;
  userArticles: any[] = [];

  constructor(
    private route: ActivatedRoute,
    // private authService: AuthService,
    private articleService: ArticleService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.userId = params.get('userId')!;
      this.fetchUserData(this.userId);
      this.fetchUserArticles(this.userId);
    });
  }

  fetchUserData(userId: string): void {
    const db = getFirestore();
    const userRef = doc(db, 'users', userId);
    
    getDoc(userRef).then((docSnap) => {
      if (docSnap.exists()) {
        this.userData = docSnap.data();
        this.newAge = this.userData.age || '';
        this.newGender = this.userData.gender || '';
        this.newUsername = this.userData.username || '';
        this.newTel = this.userData.tel || '';

       if (this.userData.profilePicture) {
        this.imagePreview = this.userData.profilePicture;
      } else {
        this.imagePreview = undefined;  
      }
    } else {
      console.log('No such user!');
    }
    });
  }

    onFileSelected(event: any): void {
      const file = event.target.files[0];
      if (file) {
        this.selectedImage = file;
    
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.imagePreview = e.target.result; 
        };
        reader.readAsDataURL(file);
      }
    }


  updateUserData(): void {
    const db = getFirestore();
    const userRef = doc(db, 'users', this.userId);

 
    if (this.selectedImage) {
      const storage = getStorage();
      const imageRef = ref(storage, 'profile_pictures/' + this.userId);
      
      uploadBytes(imageRef, this.selectedImage).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((downloadURL) => {
  
          updateDoc(userRef, {
            username: this.newUsername,
            tel: this.newTel,
            age: this.newAge,
            gender: this.newGender,
            profilePicture: downloadURL
          }).then(() => {
            console.log('User data updated successfully');
            this.fetchUserData(this.userId);
            window.location.reload();
          }).catch((error) => {
            console.error('Error updating user data: ', error);
          });
        });
      }).catch((error) => {
        console.error('Error uploading image: ', error);
      });
    } else {

      updateDoc(userRef, {
        username: this.newUsername,
        tel: this.newTel,
        age: this.newAge,
        gender: this.newGender
      }).then(() => {

        console.log('User data updated successfully');
        this.fetchUserData(this.userId);
        window.location.reload();
      }).catch((error) => {
        console.error('Error updating user data: ', error);
      });
    }
  }


fetchUserArticles(userId: string): void {
  this.articleService.getArticlesByUser(userId).subscribe({
    next: (articles) => {
      this.userArticles = articles;
    },
    error: (error) => {
      console.error('Error fetching articles:', error);
    }
  });
}

goToArticleDetails(articleId: string): void {
  this.router.navigate(['/details-article', articleId]);
}


}

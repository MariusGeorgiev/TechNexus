import { Injectable } from '@angular/core';
import { getFirestore, collection, query, orderBy, where, arrayUnion, doc, getDoc, getDocs, deleteDoc, updateDoc } from 'firebase/firestore';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ArticleService {

  private firestore = getFirestore();

  constructor() {}

  // Get Article by ID
  getArticle(articleId: string): Observable<any> {
    const articleRef = doc(this.firestore, 'articles', articleId);
    return from(getDoc(articleRef).then(docSnapshot => docSnapshot.data()));
  }

  // Get Creator
    getUser(userId: string): Observable<any> {
      const userRef = doc(this.firestore, 'users', userId);
      return from(getDoc(userRef).then(docSnapshot => docSnapshot.data()));
    }
  

  // Get All Articles
  getAllArticles(): Observable<any[]> {
    const articlesRef = collection(this.firestore, 'articles');
    const q = query(articlesRef, orderBy('date', 'desc'), orderBy('time', 'desc'));
    return from(
      getDocs(q).then(snapshot =>
        snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      )
    );
  }

  // Delete Article
  deleteArticle(articleId: string): Observable<void> {
    const articleRef = doc(this.firestore, 'articles', articleId);
    return from(deleteDoc(articleRef));
  }

  // Update Article
  updateArticle(articleId: string, updatedData: any): Observable<void> {
    const articleRef = doc(this.firestore, 'articles', articleId);
    return from(updateDoc(articleRef, updatedData));
  }

  // Get users and count of created news
  getAllUsersWithArticleCount(): Observable<any[]> {
    const usersRef = collection(this.firestore, 'users');
    const articlesRef = collection(this.firestore, 'articles');
  
    return from(
      getDocs(usersRef).then(async (usersSnapshot) => {
        const userData: any[] = [];
  
        for (const userDoc of usersSnapshot.docs) {
          const userId = userDoc.id;
          const user = {
            id: userId,
            ...userDoc.data(), // includes username, tel, and createdAt
            articleCount: 0
          };
  
          // Count articles created by the user
          const userArticlesQuery = query(articlesRef, where('userId', '==', userId));
          const userArticlesSnapshot = await getDocs(userArticlesQuery);
          user.articleCount = userArticlesSnapshot.size;
  
          userData.push(user);
        }
  
        return userData;
      })
    );
  }

   // Add Comment to details-article
   addCommentToArticle(articleId: string, comment: any): Observable<void> {
    const articleRef = doc(this.firestore, 'articles', articleId);
    return from(updateDoc(articleRef, {
      comments: arrayUnion(comment) // Adds comment to the array in Firestore
    }));
  }

}
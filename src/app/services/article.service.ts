import { Injectable } from '@angular/core';
import { getFirestore, doc, getDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ArticleService {

  private firestore = getFirestore();

  constructor() {}

  // Method to fetch a single article by ID
  getArticle(articleId: string): Observable<any> {
    const articleRef = doc(this.firestore, 'articles', articleId);
    return from(getDoc(articleRef).then(docSnapshot => docSnapshot.data()));
  }

  // Delete article
  deleteArticle(articleId: string): Observable<void> {
    const articleRef = doc(this.firestore, 'articles', articleId);
    return from(deleteDoc(articleRef));
  }

  // Update article
  updateArticle(articleId: string, updatedData: any): Observable<void> {
    const articleRef = doc(this.firestore, 'articles', articleId);
    return from(updateDoc(articleRef, updatedData));
  }

}
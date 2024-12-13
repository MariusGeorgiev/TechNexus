import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '../services/article.service';
import { Observable } from 'rxjs';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.css']
})
export class EditArticleComponent implements OnInit {

  articleId: string = '';
  article$: Observable<any> | null = null; 

  article: any = {
    title: '',
    imageUrl: '',
    summary: '',
    category: ''
  };
  imagePreview: string = ''; 
  selectedImageFile: File | null = null; 

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const articleId = this.route.snapshot.paramMap.get('id');
    if (articleId) {
      this.articleId = articleId;
      
      this.articleService.getArticle(articleId).subscribe(data => {
        if (data) {
          this.article = data;
          this.imagePreview = this.article.imageUrl; 
        }
      });
    }
  }


  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files?.[0];
    if (file) {
      this.selectedImageFile = file;

      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  updateImagePreview(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.imagePreview = input.value;
  }


  saveArticle(): void {
    if (this.article) {


      if (this.selectedImageFile) {
        const storage = getStorage();
        const storageRef = ref(storage, 'images/' + this.selectedImageFile.name);
        const uploadTask = uploadBytesResumable(storageRef, this.selectedImageFile);

        uploadTask.on(
          'state_changed',
          null,
          (error) => console.error('Error uploading file:', error),
          async () => {

            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            this.article.imageUrl = downloadURL;

            this.articleService.updateArticle(this.articleId, this.article).subscribe(() => {
              alert('Article updated successfully!');
              this.router.navigate(['/details-article', this.articleId]); 
            });
          }
        );
      } else {

        this.articleService.updateArticle(this.articleId, this.article).subscribe(() => {
          alert('Article updated successfully!');
          this.router.navigate(['/details-article', this.articleId]); 
        });
      }
    }
  }
}

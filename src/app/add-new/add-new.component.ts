import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { initializeApp } from 'firebase/app';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.css']
})
export class AddNewComponent {
  createForm: FormGroup;
  selectedImageUrl: string | null = null;
  loading: boolean = false; // State for showing loader

  constructor(private fb: FormBuilder) {

    this.createForm = this.fb.group({
      title: ['', [Validators.required]],
      category: ['', [Validators.required]],
      summary: ['', [Validators.required, Validators.minLength(10)]],
      imageFile: [null, [Validators.required]]
    });

    // Init Firebase
    const app = initializeApp(environment.firebaseConfig);
  }

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files?.[0];
    if (file) {
      this.createForm.patchValue({ imageFile: file });

      // Generate a preview of the selected image
      const reader = new FileReader();
      reader.onload = (e) => {
        this.selectedImageUrl = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.createForm.valid) {
      this.loading = true; // Start loader
      const formData = this.createForm.value;
      const imageFile = formData.imageFile;

      // Upload the image to Firebase Storage
      const storage = getStorage();
      const storageRef = ref(storage, 'images/' + imageFile.name);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);

      uploadTask.on(
        'state_changed',
        null,
        (error) => { 
          console.error('Error uploading file:', error);
          this.loading = false; // Stop loader on error
        },
        async () => {
          // Get download URL and save data to Firestore
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          const firestore = getFirestore();
          const articlesRef = collection(firestore, 'articles');

           // Generate the current date and time
           const now = new Date();
           const year = now.getFullYear();
           const month = String(now.getMonth() + 1).padStart(2, '0');
           const day = String(now.getDate()).padStart(2, '0');
           const hours = String(now.getHours()).padStart(2, '0');
           const minutes = String(now.getMinutes()).padStart(2, '0');
           const seconds = String(now.getSeconds()).padStart(2, '0');

           const currentDate = `${day}.${month}.${year}`
           const currentTime = `${hours}:${minutes}:${seconds}`;
           

          addDoc(articlesRef, {
            title: formData.title,
            category: formData.category,
            date: currentDate,
            time: currentTime,
            summary: formData.summary,
            imageUrl: downloadURL
          })
            .then((docRef) => {
              console.log('Document written with ID:', docRef.id);
              this.loading = false; // Stop loader on success
            // Refresh the current page after a successful is created the new article
              window.location.reload();
            })
            .catch((error) => {
              console.error('Error adding document:', error);
              this.loading = false; // Stop loader on error
            });
        }
      );
    } else {
      console.log('Form is invalid.');
    }
  }
}

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
  //currentDateTime: string; // "YYYY-MM-DDTHH:mm"

  constructor(private fb: FormBuilder) {
    // this.currentDateTime = this.formatDateTime(new Date());

    this.createForm = this.fb.group({
      title: ['', [Validators.required]],
      category: ['', [Validators.required]],
      // date: [this.currentDateTime, [Validators.required]],
      summary: ['', [Validators.required, Validators.minLength(10)]],
      imageFile: [null, [Validators.required]]
    });

    // Init Firebase
    const app = initializeApp(environment.firebaseConfig);
  }

  // Function to format date as "YYYY-MM-DDTHH:mm" (for datetime-local input)
  // formatDateTime(date: Date): string {
  //   const year = date.getFullYear();
  //   const month = String(date.getMonth() + 1).padStart(2, '0'); // Ensure 2 digits
  //   const day = String(date.getDate()).padStart(2, '0');
  //   const hours = String(date.getHours()).padStart(2, '0');
  //   const minutes = String(date.getMinutes()).padStart(2, '0');
  //   return `${year}-${month}-${day}T${hours}:${minutes}`;
  // }

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
      const formData = this.createForm.value;
      const imageFile = formData.imageFile;

      // Step 1: Upload the image to Firebase Storage
      const storage = getStorage();
      const storageRef = ref(storage, 'images/' + imageFile.name);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);

      uploadTask.on(
        'state_changed',
        null,
        (error) => console.error('Error uploading file:', error),
        async () => {
          // Step 2: Get download URL and save data to Firestore
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          const firestore = getFirestore();
          const articlesRef = collection(firestore, 'articles');

           // Generate the current date and time in local timezone
           const now = new Date();
           const year = now.getFullYear();
           const month = String(now.getMonth() + 1).padStart(2, '0');
           const day = String(now.getDate()).padStart(2, '0');
           const hours = String(now.getHours()).padStart(2, '0'); // Local hours
           const minutes = String(now.getMinutes()).padStart(2, '0');
           const currentDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;

          // Automatically add current date and time in ISO format
          //const currentDateTime = new Date().toISOString();

          addDoc(articlesRef, {
            title: formData.title,
            category: formData.category,
            date: currentDateTime,
            summary: formData.summary,
            imageUrl: downloadURL
          })
            .then((docRef) => {
              console.log('Document written with ID:', docRef.id);
            })
            .catch((error) => {
              console.error('Error adding document:', error);
            });
        }
      );
    } else {
      console.log('Form is invalid.');
    }
  }
}

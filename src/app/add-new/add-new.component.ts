
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.css']
})
export class AddNewComponent{
  createForm: FormGroup;
  selectedImageUrl: string | null = null;
  currentDate: string; // Current date string in YYYY-MM-DD format

  constructor(private fb: FormBuilder) {
    const now = new Date();
    this.currentDate = now.toISOString().split('T')[0]; // YYYY-MM-DD format
    this.createForm = this.fb.group({
      title: ['', [Validators.required]],
      category: ['', [Validators.required]],
      date: [this.currentDate, [Validators.required]], // Autofill current date
      summary: ['', [Validators.required, Validators.minLength(10)]],
      imageFile: [null, [Validators.required]]
    });
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
      const formData = new FormData();
      formData.append('title', this.createForm.get('title')?.value);
      formData.append('category', this.createForm.get('category')?.value);
      formData.append('date', this.createForm.get('date')?.value);
      formData.append('summary', this.createForm.get('summary')?.value);
      formData.append('imageFile', this.createForm.get('imageFile')?.value);

      console.log('Form Data:', formData);
      // You can now send the formData to the backend
    } else {
      console.log('Form is invalid.');
    }
  }
}
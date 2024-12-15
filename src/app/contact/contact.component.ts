import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  onSubmit(event: Event): void {
    event.preventDefault();
    console.log('Form submitted');
    alert('Message sent successfully!');
  }
}

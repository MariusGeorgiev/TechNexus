import { Component, OnInit } from '@angular/core';
import emailjs from '@emailjs/browser';
import { AuthService } from '../services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})

export class ContactComponent implements OnInit {
  successMessage: string = '';
  errorMessage: string = '';
  userEmail: string = '';
  userName: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const email = this.authService.getUserEmail();
    const currentUsername = this.authService.getCurrentCollectionUser();
    if (email) {
      this.userEmail = email;
    }

    if (currentUsername) {
      this.userName = currentUsername.username;
    }

  }
  

  sendEmail(event: Event) {
    event.preventDefault(); 

    const form = event.target as HTMLFormElement;

    const emailParams = {
      from_name: this.userName,  
      from_email: this.userEmail,  
      message: form['message'].value
    };

    emailjs.send(
      environment.emailjs.serviceId,   
      environment.emailjs.templateId,  
      emailParams,
      environment.emailjs.userId

    ).then(
      (response) => {
        console.log('SUCCESS!', response.status, response.text);
        this.successMessage = 'Your message has been sent successfully!';
        form.reset(); 
      },
      (error) => {
        console.error('FAILED...', error);
        this.errorMessage = 'An error occurred while sending your message. Please try again.';
      }
    );
  }
}



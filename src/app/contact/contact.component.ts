import { Component, OnInit } from '@angular/core';
import emailjs from '@emailjs/browser';
import { AuthService } from '../services/auth.service'; 

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})

export class ContactComponent implements OnInit {
  successMessage: string = '';
  errorMessage: string = '';
  userEmail: string = ''; 

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const email = this.authService.getUserEmail();
    if (email) {
      this.userEmail = email;
    }
  }
  

  sendEmail(event: Event) {
    event.preventDefault(); 

    const form = event.target as HTMLFormElement;

    const emailParams = {
      from_name: form['from_name'].value,  
      from_email: this.userEmail,  
      message: form['message'].value
    };

    emailjs.send(
      'service_qauxr42',   
      'template_szlnkrm',  
      emailParams,
      'ta0FelLgIvC8hcghh' 

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


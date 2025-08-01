import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user';
import { User } from '../../models/user.interface';

@Component({
  selector: 'app-add-user',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-user.html',
  styleUrl: './add-user.css'
})
export class AddUserComponent {
  @Output() onUserAdded = new EventEmitter<User>();

  newUser: User = {
    id: 0,
    name: '',
    username: '',
    email: '',
    address: {
      street: '',
      suite: '',
      city: '',
      zipcode: '',
      geo: {
        lat: '',
        lng: ''
      }
    },
    phone: '',
    website: '',
    company: {
      name: '',
      catchPhrase: '',
      bs: ''
    }
  };

  isSubmitting = false;
  successMessage = '';
  errorMessage = '';

  constructor(private userService: UserService) {}

  onSubmit(): void {
    if (this.isSubmitting) return;

    this.isSubmitting = true;
    this.successMessage = '';
    this.errorMessage = '';

    this.userService.createUser(this.newUser).subscribe({
      next: (createdUser) => {
        this.successMessage = 'User created successfully!';
        this.onUserAdded.emit(createdUser);
        this.resetForm();
        this.isSubmitting = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to create user. Please try again.';
        console.error('Error creating user:', err);
        this.isSubmitting = false;
      }
    });
  }

  resetForm(): void {
    this.newUser = {
      id: 0,
      name: '',
      username: '',
      email: '',
      address: {
        street: '',
        suite: '',
        city: '',
        zipcode: '',
        geo: {
          lat: '',
          lng: ''
        }
      },
      phone: '',
      website: '',
      company: {
        name: '',
        catchPhrase: '',
        bs: ''
      }
    };
  }
}
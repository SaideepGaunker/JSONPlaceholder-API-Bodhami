import { Component, Input, Output, EventEmitter, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user.interface';
import { UserService } from '../../services/user';

@Component({
  selector: 'app-edit-user',
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-user.html',
  styleUrl: './edit-user.css'
})
export class EditUserComponent implements OnInit, OnChanges, OnDestroy {
  @Input() user: User | null = null;
  @Input() isVisible: boolean = false;
  @Output() onClose = new EventEmitter<void>();
  @Output() onSave = new EventEmitter<User>();

  editedUser: User = {
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

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    if (this.user) {
      this.editedUser = { ...this.user };
    }
  }

  ngOnChanges(): void {
    if (this.user) {
      this.editedUser = { ...this.user };
    }
    
    // Prevent body scroll when modal is visible
    if (this.isVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }

  saveUser(): void {
    if (this.editedUser.id) {
      this.userService.updateUser(this.editedUser.id, this.editedUser).subscribe({
        next: (updatedUser) => {
          this.onSave.emit(updatedUser);
          this.closeModal();
        },
        error: (err) => {
          console.error('Error updating user:', err);
        }
      });
    }
  }

  closeModal(): void {
    // Restore body scroll
    document.body.style.overflow = 'auto';
    this.onClose.emit();
  }

  ngOnDestroy(): void {
    // Ensure body scroll is restored when component is destroyed
    document.body.style.overflow = 'auto';
  }
}

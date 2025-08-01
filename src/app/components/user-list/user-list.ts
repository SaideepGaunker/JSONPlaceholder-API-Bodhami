import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user';
import { User } from '../../models/user.interface';
import { EditUserComponent } from '../edit-user/edit-user';

@Component({
  selector: 'app-user-list',
  imports: [CommonModule, EditUserComponent],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css'
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  loading = false;
  error: string | null = null;
  selectedUser: User | null = null;
  showEditModal = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.error = null;
    
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load users';
        this.loading = false;
        console.error('Error loading users:', err);
      }
    });
  }

  editUser(user: User): void {
    this.selectedUser = user;
    this.showEditModal = true;
  }

  onEditClose(): void {
    this.showEditModal = false;
    this.selectedUser = null;
  }

  onEditSave(updatedUser: User): void {
    // Update the user in the local array
    const index = this.users.findIndex(u => u.id === updatedUser.id);
    if (index !== -1) {
      this.users[index] = updatedUser;
    }
    this.showEditModal = false;
    this.selectedUser = null;
  }

  handleUserSave(event: User): void {
    this.onEditSave(event);
  }

  deleteUser(id: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id).subscribe({
        next: () => {
          this.users = this.users.filter(user => user.id !== id);
        },
        error: (err) => {
          console.error('Error deleting user:', err);
        }
      });
    }
  }
}

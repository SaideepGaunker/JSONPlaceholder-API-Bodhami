import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from '../user-list/user-list';
import { AddUserComponent } from '../add-user/add-user';

@Component({
  selector: 'app-home',
  imports: [CommonModule, UserListComponent, AddUserComponent],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent {
  currentView: 'home' | 'add-user' | 'view-users' = 'home';

  showAddUser(): void {
    this.currentView = 'add-user';
  }

  showViewUsers(): void {
    this.currentView = 'view-users';
  }

  goHome(): void {
    this.currentView = 'home';
  }

  onUserAdded(user: any): void {
    console.log('User added:', user);
    // Optionally switch to view users after adding
    this.showViewUsers();
  }
}
import { Component, OnInit } from '@angular/core';
import { AuthService, UserService } from '../../../services';
import { UserInterface } from '../../../interfaces';
import { format } from 'date-fns';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  users!: UserInterface[];
  httpStatus = {
    isLoading: false,
    isUpdating: false,
    isDeleting: false,
  };
  selectedUsers: UserInterface[] = [];

  constructor(
    private userSer: UserService,
    private authSer: AuthService,
    private router: Router
  ) {}

  onInit() {
    this.httpStatus = { ...this.httpStatus, isLoading: true };

    this.userSer.getAllUsers().subscribe((data) => {
      this.users = data;
      this.httpStatus = {
        isLoading: false,
        isUpdating: false,
        isDeleting: false,
      };
    });
  }

  ngOnInit(): void {
    this.httpStatus = {
      isLoading: false,
      isUpdating: false,
      isDeleting: false,
    };
    this.onInit();
  }

  onSignout(): void {
    this.authSer.signout();
    this.router.navigate(['']);
  }

  onUpdateUser(user: UserInterface): void {
    this.httpStatus = { ...this.httpStatus, isUpdating: true };
    this.userSer.updateUser(user).subscribe({
      next: (data) => {
        this.selectedUsers = [];
        if (data.email === localStorage.getItem('user_email')) {
          this.onSignout();
        } else {
          this.onInit();
        }
      },
      error: (error) => console.log(error),
      complete: () => {
        this.httpStatus = { ...this.httpStatus, isLoading: false };
      },
    });
  }

  onDeleteUsers(user: UserInterface): void {
    this.httpStatus = { ...this.httpStatus, isDeleting: true };
    this.userSer.deleteUser(user).subscribe({
      next: (data) => {
        this.selectedUsers = [];
        if (data.email === localStorage.getItem('user_email')) {
          this.onSignout();
        } else {
          this.onInit();
        }
      },
      error: (error) => console.log(error),
      complete: () => {
        this.httpStatus = { ...this.httpStatus, isDeleting: false };
      },
    });
  }

  handleSelectedUsers(userData: UserInterface): void {
    const user = this.selectedUsers.find((user) => user.id === userData.id);

    if (user) {
      this.selectedUsers = this.selectedUsers.filter(
        (user) => user.id !== userData.id
      );
    } else {
      this.selectedUsers = [...this.selectedUsers, userData];
    }
  }

  handleAllSelectedUsers(): void {
    if (this.selectedUsers.length === this.users.length) {
      this.selectedUsers = [];
    } else {
      this.selectedUsers = [...this.users];
    }
  }

  getIsSelected(id: number): boolean {
    return this.selectedUsers.find((selectedUser) => selectedUser.id === id)
      ? true
      : false;
  }

  getTime(date: string | undefined): string {
    return date
      ? `${format(new Date(date), 'hh:MM a')}, ${format(
          new Date(date),
          'dd LLLL yyyy'
        )}`
      : '-';
  }
}

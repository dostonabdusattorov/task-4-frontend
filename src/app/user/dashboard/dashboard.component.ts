import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../user.interface';
import { format } from 'date-fns';

@Component({
  selector: 'app-user',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  constructor(private userSer: UserService) {}

  users: User[] = [];

  ngOnInit(): void {
    this.userSer.getAllUsers().subscribe((data) => {
      this.users = data;
      console.log(this.users);
    });
  }

  getTime(date: string): string {
    return format(new Date(date), 'hh:MM a');
  }

  getDate(date: string): string {
    return format(new Date(date), 'dd LLLL yyyy');
  }
}

import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services';
import { UserInterface } from '../../../interfaces';
import { format } from 'date-fns';

@Component({
  selector: 'app-user',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  constructor(private userSer: UserService) {}

  users: UserInterface[] = [];

  ngOnInit(): void {
    this.userSer.getAllUsers().subscribe((data) => {
      this.users = data;
      console.log(this.users);
    });
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

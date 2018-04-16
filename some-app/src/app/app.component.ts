import { Component, OnInit } from '@angular/core';

import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  name = 'Batman';

  list = [];

  selected = null;

  constructor(private userService: UserService) { }

  getUsers(): void {
    this.list = this.userService.getUsers();
  }

  ngOnInit() {
    this.getUsers();
  }

  clickHandler (item) {
    this.selected = item;
  }

}

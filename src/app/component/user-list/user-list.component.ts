import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[]= new Array;
  currentUser = null;
  currentIndex = -1;
  msg: any = "";

  constructor(private userService: UsersService, private activeRoute: ActivatedRoute) {}

  ngOnInit(): void {
    console.log("ngOnInit() called");

    this.readUsers();
  }
  readUsers(): void {
    console.log("readUsers() called");
    this.userService.readAll()
      .subscribe({
        next: (users) => {
          this.users = users;
          console.log(JSON.stringify(users));
          return users;
        },
        error: (error) => {
          console.log(error);
        }});
  }

  deleteUser( uname: String): void {
    console.log("deleteUser() called: Username=" +uname);
    this.userService.delete( uname)
      .subscribe( {
        next: (msg) => {
          this.msg = msg;
          console.log(this.msg);
        },
        error: (error) => {
          console.log(error);
        }});
    this.readUsers();
  }
  updateUser( user: any)   {
    console.log("updateUser() called: user=" +JSON.stringify(user));
    this.userService.update( user.uname, user)
      .subscribe( {
        next: (msg) => {
          this.msg = msg;
          console.log(this.msg);
        },
        error: (error) => {
          console.log(error);
        }});
    this.readUsers();
  }
  refresh(): void {
    this.readUsers();
  }

  setCurrentUser(user: any, index: number): void {
    this.currentUser = user;
    this.currentIndex = index;
  }
}

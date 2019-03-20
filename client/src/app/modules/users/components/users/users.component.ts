import { Component, OnInit } from '@angular/core';
import { UsersService } from 'modules/users/services/users.service';
import { IUser } from 'modules/auth/interfaces/i.user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  public displayedColumns: string[];
  public dataSource: IUser[];

  constructor(
    private readonly usersService: UsersService
  ) {
    this.usersService.getUsers()
      .subscribe((users) => {
        this.dataSource = users;
        console.log(this.dataSource);
      });
    this.displayedColumns = ['lastName', 'firstName', 'email'];
  }

  public ngOnInit() { }
}

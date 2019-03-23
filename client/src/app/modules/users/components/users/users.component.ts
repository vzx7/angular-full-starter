import { IPeriodicUser } from 'modules/users/interfaces/i.periodic-user';
import { IUser } from 'modules/users/interfaces/i.user';
import { UsersService } from 'modules/users/services/users.service';

import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { ToastService } from 'core/services/toast/toast.service';
import { Router } from '@angular/router';

/**
 * Component for Users
 */
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  /**
   * Fields
   */
  public displayedColumns: string[];
  /**
   * User's data
   */
  public dataSource: MatTableDataSource<IUser>;
  /**
   * Selected users
   */
  public selection = new SelectionModel<IUser>(true, []);

  /**
   * constructor
   * @param usersService UsersService
   * @param toast ToastService
   * @param router ToastService
   */
  constructor(
    private readonly usersService: UsersService,
    private readonly toast: ToastService,
    private readonly router: Router
  ) {
    this.usersService.getUsers()
      .subscribe((users: IUser[]) => {
        let position = 0;
        this.dataSource = new MatTableDataSource<IUser>(users.map((item) => {
          position++;

          return { ...item, position };
        }));
      });
    this.displayedColumns = [
      'select',
      'position',
      'firstName',
      'lastName',
      'login',
      'email'
    ];
  }

  public ngOnInit() { }

  /**
   * Whether the number of selected elements matches the total number of rows.
   * @return boolean
   */
  public isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;

    return numSelected === numRows;
  }

  /**
   * Selects all rows if they are not all selected; otherwise clear selection.
   */
  public masterToggle(): void {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  /**
   * The label for the checkbox on the passed row
   * @param row user
   * @return string
   */
  public checkboxLabel(row?: IPeriodicUser): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }

    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  /**
   * Delete Users
   */
  public deleteUsers(): void {
    this.usersService.deleteUsers(this.selection.selected.map((item) => item.id))
      .subscribe((isSuccess: boolean) => {
        if (isSuccess) {
          this.toast.openSnackBar(
            `Users: ${this.selection.selected.map((i) => i.firstName).join(', ')}, removed successfully!`
          );
        } else {
          this.toast.openSnackBar(
            `Sorry, the removing failed.`,
            'Error',
            { duration: 3000, panelClass: 'error' }
          );
        }
      });
  }

  /**
   * Edit User
   * @param id User ID
   */
  public editUser(id: string): void {
    this.router.navigate([`/users/edit/${id}`]);
  }
}

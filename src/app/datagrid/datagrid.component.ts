import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UsersApiService } from '../_services/users-api.service';
import { User, UserData } from '../_dtos/dtos';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-datagrid',
  templateUrl: './datagrid.component.html',
  styleUrl: './datagrid.component.scss',
  providers: [UsersApiService]
})
export class DatagridComponent implements OnInit {

  @ViewChild('searchName', { static: false })
  searchNameInput!: ElementRef;

  filteredUser$!: Observable<User | undefined>;
  userData$!: Observable<UserData[]>;

  constructor(private userService: UsersApiService) {}

  ngOnInit(): void {

    this.loadData();

    // if(this.searchNameInput) {
    //   const inputName = this.searchNameInput.nativeElement.value;
    //   this.filteredUser$ = this.userService.getUserByName(inputName);
    // }
  }

  public sortByName(): void {
    this.userData$ = this.userService.getUsersDataSortedByName();
  }

  public sortById(): void {
    this.userData$ = this.userService.getUsersDataSortedById();
  }

  public loadData(): void {
    this.userData$ = this.userService.getUsersData();
  }

  public searchBy(nameInput: HTMLInputElement) {
    if(nameInput.value) {
      this.userData$ = this.userService.getFilteredUsersData(nameInput.value)
    }
  }
}

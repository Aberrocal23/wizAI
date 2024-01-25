import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Post, User, UserData } from '../_dtos/dtos';

@Injectable({
  providedIn: 'root'
})
export class UsersApiService {

  postURL = 'https://gorest.co.in/public/v2/users/';

  constructor(private httpClient: HttpClient) { }

  private mapPostsToUsers(users: User[]): UserData[] {
    const usersWithPostsCount: UserData[] = [];
    users.forEach(userResult => {
      const user: UserData = {id: '', name: '', surname: '', initials: '', email: '', gender:'', posts: 0};

      user.email = userResult.email;
      user.gender = userResult.gender;
      user.id = userResult.id;

      const nameParts = userResult.name.split(' ');
      if(nameParts.length == 2) {
        user.name = nameParts[0];
        user.surname = nameParts[1];
      }
      else {
        if(nameParts[0].includes('.')) {
          user.name = nameParts[1];
          user.surname = nameParts[2];
        }
        else {
          user.name = nameParts[0];
          user.surname = nameParts[1];
        }
      }

      user.initials = `${user.name.charAt(0)}${user.surname.charAt(0)}`;

      this.getPostsForUser(userResult.id).pipe(map(posts => this.getCountOfPosts(posts))).subscribe(count => {
        user.posts = count;
      });

      console.log(user.posts);

      usersWithPostsCount.push(user);
    })
    return usersWithPostsCount;
  }

  
  private sortUserDataByName(userDataArray: UserData[], sortBy: string): UserData[] {
    return userDataArray.sort((a, b) => {
      if(sortBy == 'name')
      {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
      }
      else 
      {
        if (a.surname < b.surname) {
          return -1;
        }
        if (a.surname > b.surname) {
          return 1;
        }
      }
      return 0;
    });
  }

  private sortUserDataById(userDataArray: UserData[]): UserData[] {
    return userDataArray.sort((a, b) => {
      if (a.id < b.id) {
        return -1;
      }
      if (a.id > b.id) {
        return 1;
      }
      return 0;
    });
  }

  private getCountOfPosts(posts: Post[]): number {
    const count = posts.length;
    return count;
  }

  private sortByName(userDataArray: UserData[], name: string): UserData[] {
    return userDataArray.filter(p => p.name == name);
  }

  getUsersData(): Observable<UserData[]> {
    return this.httpClient.get<User[]>('https://gorest.co.in/public/v2/users').pipe(
      map(usersResult => this.mapPostsToUsers(usersResult))
    );
  }

  getUsersDataSortedByName(): Observable<UserData[]> {
    return this.httpClient.get<User[]>('https://gorest.co.in/public/v2/users').pipe(
      map(usersResult => this.mapPostsToUsers(usersResult)),
      map(userDataArray => this.sortUserDataByName(userDataArray, 'name'))
    );
  }

  getUsersDataSortedById(): Observable<UserData[]> {
    return this.httpClient.get<User[]>('https://gorest.co.in/public/v2/users').pipe(
      map(usersResult => this.mapPostsToUsers(usersResult)),
      map(userDataArray => this.sortUserDataById(userDataArray))
    );
  }

  getFilteredUsersData(nameInput: string): Observable<UserData[]> {
    return this.httpClient.get<User[]>('https://gorest.co.in/public/v2/users').pipe(
      map(usersResult => this.mapPostsToUsers(usersResult)),
      map(userDataArray => this.sortByName(userDataArray, nameInput))
    );
  }

  getPostsForUser(userId: string): Observable<Post[]> {
    return this.httpClient.get<Post[]>(`${this.postURL}${userId}/posts`);
  }

  getUserByName(name: string): Observable<UserData | undefined> {
    return this.getUsersData().pipe(map(users => users.find(user => user.name == name)));
  }

  getUserById(id: string): Observable<UserData | undefined> {
    return this.getUsersData().pipe(map(users => users.find(user => user.id == id)));
  }
}

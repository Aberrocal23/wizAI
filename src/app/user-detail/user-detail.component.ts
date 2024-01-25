import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersApiService } from '../_services/users-api.service';
import { Observable, tap } from 'rxjs';
import { Post, User, UserData } from '../_dtos/dtos';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss',
  providers: [UsersApiService]
})
export class UserDetailComponent implements OnInit{

  user$!: Observable<UserData | undefined>;
  posts$!: Observable<Post[]>;
  postsAvailable!: boolean;

  constructor(private route: ActivatedRoute, private userService: UsersApiService) { }

  ngOnInit(): void {
    const userId = this.getUser();
    this.user$ = this.userService.getUserById(userId);
    this.posts$ = this.userService.getPostsForUser(userId);
  }

  getUser(): string {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('Selected UserId is: ' + id);
    if(id !== null) {
      return id;
    }
    else {
      return '';
    }
  }
}

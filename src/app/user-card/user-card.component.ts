import { Component, Input, OnInit } from '@angular/core';
import { UserData } from '../_dtos/dtos';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent implements OnInit{

  @Input()
  user!: UserData;

  constructor() {}

  ngOnInit(): void {
  }

}

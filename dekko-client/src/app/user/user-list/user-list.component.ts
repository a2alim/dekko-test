import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { UserModel } from 'src/app/user/model/user.model';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  userList: UserModel[] = [];
  user: UserModel = new UserModel();

  constructor(
    private _router: Router,
    private toastr: ToastrService,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  add(){
    this._router.navigateByUrl('user/add',{state: {user: this.user}});
  }

  edit(user:UserModel){
    this.user = user
    this._router.navigateByUrl('user/add',{state: {user: this.user}});
  }

  getUsers(){
    this.userService.getUsers().subscribe(
      res => {
        if(res){
          this.userList = res;
        }
      },
      err =>{
        this.toastr.error("Error occur while getting user !!");
      }
    )
  }
  
  delete(user: UserModel){
    this.userService.deleteItem(Number(user.id)).subscribe(
      res => {
        if(res){
          this.toastr.success('Delete Successful.');
          this.getUsers();
        }else{
          this.toastr.error("Delete Failed !!");
        }
      },
      err =>{
        this.toastr.error("Error occur while deleting user !!");
      }
    )
  }
}

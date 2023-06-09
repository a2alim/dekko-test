import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from 'src/app/user/model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = "http://localhost:8090/user";

  constructor(
    private  http: HttpClient
  ) { }

  createUsers(user: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(this.baseUrl, user);
  }

  updateUsers(user: UserModel): Observable<UserModel> {
    return this.http.put<UserModel>(this.baseUrl, user);
  }

  getUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(this.baseUrl);
  }

  deleteItem(id:number): Observable<UserModel> {
    return this.http.delete<UserModel>( this.baseUrl + '/' + id);
  }

}

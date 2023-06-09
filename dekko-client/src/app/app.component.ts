import { Component } from '@angular/core';
import { AuthService } from './auth/service/auth.service';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
// import * as io from 'socket.io-client';
import { WebSocketService } from './websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Dekko code test';
  isLogin: Boolean = false;
  activeNav: string = 'login';

  public notificationsObj: any = {count:0};
  private socket: any;
  public data: any;
  public type: any;

  constructor(
    private _authService: AuthService,
    private _store: Store<{ isLogin: Boolean }>,
    private _router: Router,
    private toastr: ToastrService,
    private cookieService: CookieService,
    private webSocketService: WebSocketService
  ) { 
    webSocketService.subscribe('/topic/type', (data: any)=> {
      console.log('TYPE : ', data);
      
      if(data){
        this.type = data;
      }
    });
    webSocketService.subscribe('/topic/notification', (data: any)=> {
      console.log('notificationsObj : ', data);
      if(data){
        this.notificationsObj = data;
      }
    });

  }

  ngOnInit(): void {
    this._store.select('isLogin').subscribe((data) => {
      this.isLogin = data;
    });

    this.isLogin = this.cookieService.check('access_token');
    
  }

  handleLogout(){
    if(this.isLogin){
      this._authService.logOut().subscribe(
        res => {
          if(res){
            this.isLogin = false;
            this.toastr.success('Logout Successfully.');
            this._router.navigateByUrl('login');
          }else{
            this.toastr.warning('Logout Failed !!');
          }
        }
      );
    }else{
      this.toastr.warning('Please Login First !!');
    }
  }

}


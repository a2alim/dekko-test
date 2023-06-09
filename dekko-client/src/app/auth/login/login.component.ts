import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { login } from 'src/app/state/login/login.action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  
  isLogin: Boolean = false;
  loginForm: FormGroup;

  constructor(
    private _store: Store<{ isLogin: Boolean }>,
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
    private toastr: ToastrService,
    private cookieService: CookieService,
  ) {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.cookieService.delete('access_token');
  }

  handleLogin(){
    this._authService.login(this.loginForm?.value.email, this.loginForm?.value.password).subscribe(
      res =>{
        if(res && res.token){
          this.toastr.success(res.message);
          this._store.dispatch(login());
          this._authService.setAccessToken(res.token);
          this._router.navigateByUrl('user');
        } else {
          this.toastr.error(res.message);
        }
      },
      err => {
        this.toastr.error('invalid username/password !!');
        console.log('login err : ',err);
      }
    );
  }

  reset(){
    this.loginForm.reset();
  }

  // sendNotificationToAll(){
  //   var stompClient = null;
  //   var socket = new SockJS('/ws');
  //   stompClient = Stomp.over(socket);
  //   stompClient.connect({}, function(frame) {
  //       console.log(frame);
  //       stompClient.subscribe('/all/messages', function(result) {
  //           show(JSON.parse(result.body));
  //       });
  //   });
  // }


}

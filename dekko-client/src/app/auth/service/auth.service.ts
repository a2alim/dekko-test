import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { Store } from '@ngrx/store';
import { login, logout } from 'src/app/state/login/login.action';
import { Router } from '@angular/router';


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    baseUrl = "http://localhost:8090/auth";

    constructor(
        private http: HttpClient,
        private cookieService: CookieService,
        private router: Router,
        private _store: Store<{ isLogin: Boolean }>,
    ) {}

    setAccessToken(token: string) {
        this.cookieService.set('access_token', token);
    }

    getAccessToken(): string {
        return this.cookieService.get('access_token');
    }

    checkAccessToken(): boolean {
        return  !!this.cookieService.get('access_token');
    }

    public login(email: any, password: any): Observable<any> {

        let isLogin = false;
        let reqObj: any = {'email': email, 'password': password };

        return this.http.post<any>(this.baseUrl+'/login', reqObj)//.subscribe(
        //     res =>{
        //         console.log('login res : ',res);
        //         this._store.dispatch(login());
        //         this.setAccessToken(res.token);
        //         isLogin = true;
        //         this.router.navigateByUrl('user');
        //     },
        //     err => {
        //         console.log('login err : ',err);
        //         isLogin = false;
        //     }
        // );
        // return of(isLogin);
    }

    logOut(): Observable<any> {
        this.cookieService.delete('access_token');

        // this._store.dispatch(logout());
        return of(true);

    }

}

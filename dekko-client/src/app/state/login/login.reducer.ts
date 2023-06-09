import { createReducer, on } from "@ngrx/store";
import { isLoginInitialState } from "./login.state";
import { login, logout } from "./login.action";

export function loginReducer(state: any, action: any){
    return _loginReducer(state, action);
} 

const _loginReducer = createReducer(
    isLoginInitialState,
    on(login, (isLogin: boolean) => {
        isLogin = true
        return isLogin
    }),
    on(logout, (isLogin: boolean) =>{
        isLogin = false;
        return isLogin;
    })
)
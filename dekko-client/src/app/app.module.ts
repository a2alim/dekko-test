import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { StoreModule } from "@ngrx/store";
import { HttpClientModule } from '@angular/common/http';
import { loginReducer } from './state/login/login.reducer';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WebSocketService } from './websocket.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    StoreModule.forRoot(
      {isLogin: loginReducer}
    )
  ],
  providers:[
    AuthGuard,
    WebSocketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

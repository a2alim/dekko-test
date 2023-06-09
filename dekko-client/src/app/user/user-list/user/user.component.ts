import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { UserModel } from 'src/app/user/model/user.model';
import { UserService } from '../../service/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: UserModel = new UserModel();
  form: FormGroup;
  maxDob: Date = new Date();

  constructor(
    private _router: Router,
    private _formBuilder: FormBuilder,
    private userService: UserService,
    private toaster: ToastrService
  ) {
    this.form = this._formBuilder.group({
      id: [''],
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      email: ['',[Validators.email, Validators.required]],
      mobileNumber: ['', [Validators.minLength(11), Validators.maxLength(11), Validators.pattern("^[0-9]*$")]],
      address: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      userId: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.maxDob = new Date(moment().subtract(1, 'days').toString());
    this.user = history.state.user;
    if(this.user){
      this.patchFormVale();
    }
  }

  createOrUpdate(){
    if(this.form.invalid){
      this.toaster.warning("Please fill required field ||");
      return;
    }
    this.form.value.id ? this.update() : this.create();
  }

  create(){
    console.log("this.form.value", this.form.value);
    this.userService.createUsers(this.form.value).subscribe(
      res => {
        if(res){
          this.form.reset();          
          this.toaster.success("Create Successful.");
        }else{
          this.toaster.error("Create failed !!");
        }
      },
      err =>{
        this.toaster.error("Error occur while creating user !!");
      }
    )
  }

  update(){
    this.userService.updateUsers(this.form.value).subscribe(
      res => {
        if(res){
          this.form.reset();
          this.toaster.success("Update Successful.");
        }else{
          this.toaster.error("Update failed !!");
        }
      },
      err =>{
        this.toaster.error("Error occur while updating user !!");
      }
    )
  }

  patchFormVale(){
    this.form.patchValue({
      'id': this.user.id,
      'firstName': this.user.firstName,
      'lastName': this.user.lastName,
      'email': this.user.email,
      'mobileNumber': this.user.mobileNumber,
      'address': this.user.address,
      'dateOfBirth': this.user.dateOfBirth ? new Date(this.user.dateOfBirth) : null,
      'userId': this.user.userId,
      'password': this.user.password,
    });
  };

  backToList(){
    this._router.navigateByUrl('user')
  }
  
}

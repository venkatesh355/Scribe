import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  userMessage:string = "";
  userError:any;

  constructor(public fb:FormBuilder, public authService:AuthService, public router: Router) {
    this.loginForm = this.fb.group({
      email:['',[Validators.email,Validators.required]],
      password:['',[Validators.required]]
    })
   }

  ngOnInit(): void {
  }

  onSubmit(form:any){
    let email = form.value.email;
    let password = form.value.password
    this.authService.login(email,password)
    .then(data => {
      console.log(data);
      this.userMessage = "You have been logged in successfully";
      this.router.navigate(['/myblogs'])
    }).catch((err)=>{
      console.log(err);
      this.userError = err;
    })
  }

}

import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms'
import { AuthService } from '../auth.service';
import firebase from "firebase/app";
import "firebase/firestore";
import 'firebase/auth';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  myForm: FormGroup;
  userMessage:string = "";
  userError:any;

  constructor(public fb:FormBuilder, public authService: AuthService) {
    this.myForm = this.fb.group({
      firstName:['', [Validators.required]],
      lastName:['', [Validators.required]],
      email:['', [Validators.required]],
      password:['', [Validators.required, Validators.minLength(8)]],
      confirmPassword:['', [Validators.required]],
    },{
      validator:this.checkIfMatchingPassword("password","confirmPassword")
    })
   }

   checkIfMatchingPassword(passwordKey: string, confirmPasswordKey: string){
    return(group:FormGroup) => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];

      if(password.value == confirmPassword.value){
        return;
      } else {
        confirmPassword.setErrors({
          notEqualToPassword:true
        })
      }
    }
   }

  ngOnInit(): void {
  }

  onSubmit(signupform:any){
    let email: string = signupform.value.email;
    let password: string = signupform.value.password;
    let firstName: string = signupform.value.firstName;
    let lastName: string = signupform.value.lastName;
    
    this.authService.signup(email,password,firstName,lastName)
    .then((user:any) => {
      let randomNumber = Math.floor(Math.random() * 1000)
      firebase.firestore().collection('users').doc(user.uid).set({
        firstName: signupform.value.firstName,
        lastName: signupform.value.lastName,
        email: signupform.value.email,
        photoURL: user.photoURL,
        interest:"",
        bio:"",
        hobbies:""
      }).then(() => {
        this.userMessage = "You have been signed up successfully. Please login."
      })
    }).catch(err => {
      this.userError = err;
    }
    )
  }

}

import { Injectable } from '@angular/core';
import firebase from "firebase/app";
import "firebase/firestore";
import 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login(email:string, password:string){
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  signup(email:string, password:string, firstName:string, lastName:string){
    return new Promise((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((response:any) => {
         let randomNumber = Math.floor(Math.random() * 1000)
         response.user.updateProfile({
          displayName: firstName + " " +lastName,
          photoURL:`https://robohash.org/${randomNumber}`
        }).then(() => {
          resolve(response.user);
        }).catch((err:any) => {
          reject(err);
        })
      }).catch((err: any)=>{
        reject(err);
      })
    })
  }
}

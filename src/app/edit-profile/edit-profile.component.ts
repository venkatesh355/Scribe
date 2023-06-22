import { Component, OnInit } from '@angular/core';
import firebase from "firebase/app";
import "firebase/firestore";
import 'firebase/auth';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
user:any = {};
message:string = "";
  constructor() { 
    this.getProfile();
  }

  ngOnInit(): void {
    //this.getProfile();
  }

  getProfile(){
    let userId = firebase.auth().currentUser?.uid;
    //console.log(userId);
    
    firebase.firestore().collection('users').doc(userId).get()
    .then(documentSnapshot => {
      this.user = documentSnapshot.data();
      this.user.displayName = this.user.firstName + " " + this.user.lastName;
      this.user.id = documentSnapshot.id;
    }).catch(err => console.log(err)
    )
  }

  update(){
    this.message = "Updating Profile...";
    firebase.auth().currentUser?.updateProfile({
      displayName: this.user.displayName, photoURL:this.user.photoURL
    }).then(() => {
      let userId = firebase.auth().currentUser?.uid;
      firebase.firestore().collection('users').doc(userId).update({
        firstName : this.user.displayName.split('')[0],
        lastName: this.user.displayName.split('')[1],
        hobbies:this.user.hobbies,
        interests: this.user.interests,
        bio:this.user.bio
      }).then(() => {
        this.message = "Profile updated successfully"
      }).catch(err => console.log(err)
      )
    })
  }

}

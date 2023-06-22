import { Component, OnInit } from '@angular/core';
import firebase from "firebase/app";
import "firebase/firestore";
import 'firebase/auth';

@Component({
  selector: 'app-myblogs',
  templateUrl: './myblogs.component.html',
  styleUrls: ['./myblogs.component.css']
})
export class MyblogsComponent implements OnInit {

  user:any = {};
  posts:any[] = [];
  constructor() {
    this.user = firebase.auth().currentUser;
    this.getPosts();
    //console.log(this.user);
   }

  ngOnInit(): void {
  }

  getPosts(){
    firebase.firestore().collection("posts").orderBy("created","desc").get().then((querySnapshot) => {
      //console.log(querySnapshot.docs);
      this.posts = querySnapshot.docs
    })
  }
  onPostCreated(){
    this.posts = [];
    this.getPosts();
  }

  onDelete(){
    this.posts = [];
    this.getPosts();
  }

}

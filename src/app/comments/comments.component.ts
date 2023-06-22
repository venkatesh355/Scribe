import { Component, OnInit, Input } from '@angular/core';
import firebase from "firebase/app";
import "firebase/firestore";
import 'firebase/auth';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  @Input('postId') postId:any;
  comment:string = "";
  loggedIn:boolean = false;
  comments:any[] = []
  constructor() { 
    firebase.auth().onAuthStateChanged((user) => {
      if(user){
        this.loggedIn = true;
      } else{
        this.loggedIn = false;
      }
    })
  }

  ngOnInit(){
    this.getComments();
    console.log("h",this.postId);
    
  }

  postComment(){
    if(this.comment.length < 5){
      return;
    }
    firebase.firestore().collection("comments").add({
      text: this.comment,
      post: this.postId,
      owner: firebase.auth().currentUser?.uid,
      owenerName: firebase.auth().currentUser?.displayName,
      created: firebase.firestore.FieldValue.serverTimestamp()
    }).then(data => {
      console.log(data);
      this.getComments()
    }).catch(err => console.log(err))
  }

  getComments(){
    this.comments = [];
    firebase.firestore().collection('comments').where('post', '==', this.postId)
    .orderBy("created", "desc")
    .get().then((data) => {
      data.docs.forEach(commentRef => {
        this.comments.push(commentRef.data())
      })
    })
  }

}

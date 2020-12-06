import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loggedIn = new BehaviorSubject<boolean>(false);
  loggedInUser;

  constructor( private router: Router, private afAuth: AngularFireAuth) {
  }

  //this is an emmiter that emits true or false
  //converts loggedIn to observable, called in the auth.guard.ts file
  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  login(username, password) {
    if(username !== "" && password !== "") {
      //attempt sign in
      return this.afAuth.signInWithEmailAndPassword(username, password)
        //if successful set loggedIn to true
        .then(authState => {
          console.log("Login-then", authState);

          //set loggedIn to true
          this.loggedIn.next(true);

          //retrieve currently logged in user and set to loggedInUser
          //uid come from firebase
          this.loggedInUser = authState.user.uid;

          //navigate home
          this.router.navigate(['/']);
        })
        .catch(
          error => {
            //displays error message to user
            this.router.navigate(['login/' + error.message]);
            console.log(error);
          }
        )
    }
  }

  signup(username: string, password: string) {
    //create new user with username and password
    return this.afAuth.createUserWithEmailAndPassword(username, password)
      .then( authState => {
        console.log("sign up then");
        
        //set loggedIn to true
        this.loggedIn.next(true);

        //retrieve currently logged in user and set to loggedInUser
        this.loggedInUser = authState.user.uid;
        
        //navigate to home
        this.router.navigate(['/']);
      })
      .catch( error => {
        var errorMessage = error.message;
        this.router.navigate(['signup/' + error.message]);
        console.log(error);
      })
  }

  getCurrentUser() {
    //afAuth.authState returns an observable<firebase.user> 
    //if there is a logged in user than redirect them to home
    return this.afAuth.authState.subscribe(authState => {
      if(authState) {
        //change the state of the user to loggedIn
        this.loggedIn.next(true);

        //retrieve currently logged in user and set to loggedInUser
        this.loggedInUser = authState.uid;
        
        this.router.navigate(['/']);

        console.log("logged in as " + authState.uid);
      } 
      else {
        this.router.navigate(['login']);
      }
    })
  }

  

  logout() {
    //set value to false
    this.loggedIn.next(false);

    //signOut method is in the afAuth
    this.afAuth.signOut();
    
    //clear field loggedInUser, no user is logged in
    this.loggedInUser = null;
    this.router.navigate(['/login']);
  }
}

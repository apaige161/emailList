import { Component, OnInit } from '@angular/core';
//import firestore
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { LoginService } from '../../login.service';

interface User {
  name: string;
  email: string;
}

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {

  //store collection from firebase db
  usercol: AngularFirestoreCollection<User>;
  users: any;

  constructor(private afs: AngularFirestore, private _router:Router, private _loginService: LoginService) { }

  ngOnInit(): void {
    //retrieve collection
    this.usercol = this.afs.collection('users' + this._loginService.loggedInUser + '/clients');
    //provides an observable
    this.users = this.usercol.snapshotChanges().pipe(
      //map data from observable
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as User;
          const id = a.payload.doc.id;
          return {id, data};
        })
      })
    )
  }

  add() {
    //navigate to the user-form component when the add user is clicked
    this._router.navigate(['add']);
  }

  delete(userId, name) {
    if(confirm("Are you sure you want to delete " + name + "?")) {
      //doc() allows to get one specific item from firebase
      this.afs.doc('users/'+this._loginService.loggedInUser+"/clients/"+userId).delete();
    }
  }

}

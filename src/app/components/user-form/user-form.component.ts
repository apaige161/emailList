  
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router,ActivatedRoute  } from '@angular/router';
import { AngularFirestore,AngularFirestoreDocument} from '@angular/fire/firestore';

import { User } from '../../interfaces/user';
import { Observable } from 'rxjs'

import { LoginService } from '../../login.service';

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})

export class UserFormComponent  {   
  id;     
  form: FormGroup;  
  title: string;
  user = new User();   
  
  userDoc: AngularFirestoreDocument<User>;
  singleUser: Observable<User>;      
  

  constructor(fb: FormBuilder, private _router:Router, private afs: AngularFirestore, private _route:ActivatedRoute, private _loginService: LoginService){        
    //form builder that has two controls, each must not be blank
    //TODO: add better validators later
      this.form = fb.group({
          username:['',Validators.required ],
          email:['',Validators.required]            
      })                
  }

  ngOnInit(){

    //include loggedInUser id and append it to the document location


      this._route.params.subscribe(params => {
          this.id = params["id"];            
      });      
              
      if(!this.id) {
        //if no id is found than must be a new user
          this.title = "New User";                        
      }
      else {
        //states that an id is found and can update that user
          this.title = "Edit User";
          //retrieve specific user document
          this.userDoc = this.afs.doc('users/'+this._loginService.loggedInUser+"/clients/"+this.id);
          //track changes on userDoc (gives an observable)
          this.singleUser = this.userDoc.valueChanges();
          //subscribe to the observable
          this.singleUser.subscribe((user) =>{
              //get and set the values of each field value to populate form
              this.form.get('username').setValue(user.name);
              this.form.get('email').setValue(user.email);
          });
      }
  }    

  //when clicked fire this
  submit(){
      //if an id is found than allow edit
      if (this.id) {   
          //update for this user only
          this.afs.doc('users/'+this._loginService.loggedInUser+"/clients/"+this.id).update({
              name: this.user.name,	
              email: this.user.email  
          });
      }
      //if no id is found than create a new user
      else{            
          this.afs.collection('users')
            .doc(this._loginService.loggedInUser)
            .collection("clients")    
            .add({
              name: this.user.name,	
              email: this.user.email  
        });
      }
      //when completed, this navigates to the home page to see list of addresses
      this._router.navigate(['']);
  }

}








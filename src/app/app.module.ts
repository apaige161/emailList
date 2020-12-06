import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { UserComponent } from './components/user/user.component';
import { routing } from './app.routing';

import { ReactiveFormsModule } from '@angular/forms';
import { UserFormComponent } from './components/user-form/user-form.component';
import { LoginComponent } from './components/login/login.component';
import { LoginService } from './login.service';

import { SignupComponent } from './components/signup/signup.component';
import { AuthGuard } from './auth.guard';



@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    UserFormComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    ReactiveFormsModule,
    routing,

  ],
  providers: [
    LoginService,
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

  
import { RouterModule } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuard } from './auth.guard';

export const routing = RouterModule.forRoot([
    { path:'', component: UserComponent, canActivate: [AuthGuard] },
    { path:'add',component: UserFormComponent, canActivate: [AuthGuard] },
    { path:'add/:id', component: UserFormComponent, canActivate: [AuthGuard] },  	 
    { path:'login', component: LoginComponent },
    { path:'login/:invalidLoginMessage', component: LoginComponent },
    { path:'signup', component: SignupComponent },
    { path:'signup/:invalidMessage', component: SignupComponent },
]);
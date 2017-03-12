import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductSearchComponent } from './product-search/product-search.component';
import { QuantoComponent } from './quanto/quanto.component';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MembersComponent } from './members/members.component';
import { AuthGuard } from './services/auth.service';
import { SignupComponent } from './signup/signup.component';
import { EmailComponent } from './email/email.component';

export const router: Routes = [
    { path: '', redirectTo: '/Quanto', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'login-email', component: EmailComponent },
    { path: 'members', component: MembersComponent, canActivate: [AuthGuard] },
    { path: 'Quanto', component: QuantoComponent, canActivate: [AuthGuard] },
    { path: 'GroceryList', component:ProductSearchComponent, canActivate: [AuthGuard] }

];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);


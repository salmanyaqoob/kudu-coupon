import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LoginComponent } from './login.component';
import { NoAuthGuard } from './no-auth-guard.service';

import { MaterialModule } from "../../material.module";
import { SharedModule } from '../../shared/shared.module';

const loginRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: '',
    component: LoginComponent,
    //canActivate: [NoAuthGuard]
  },
  //{
  //  path: 'register',
  //  component: AuthComponent,
  //  canActivate: [NoAuthGuard]
  //}
]);

@NgModule({
  imports: [
    loginRouting,
    MaterialModule,
    SharedModule,
  ],
  declarations: [
    LoginComponent
  ],

  providers: [
    NoAuthGuard
  ]
})
export class LoginModule {}

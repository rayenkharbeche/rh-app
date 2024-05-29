import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayoutComponent } from './shared/containers';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/_helpers';
import { LogoutComponent } from './auth/logout/logout.component';
import { ForgetPasswordComponent } from './auth/forget-password/forget-password.component';
import { Role } from './auth/model/role';
import { SettingsComponent } from './setup/settings/settings.component';
import { ResetpasswordComponent } from './setup/resetpassword/resetpassword.component';
import { UpdateprofileComponent } from './setup/updateprofile/updateprofile.component';
import { EmployeProfileComponent } from './setup/employe-profile/employe-profile.component';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
 
  {
    path: 'forgetpasswd',
    component: ForgetPasswordComponent,
    data: {
      title: 'Register Page'
    }
  },
  
  {
    path: 'reset/:token',
    component: ResetpasswordComponent,
    data: {
      title: 'Reset List',
    },
    
  },

  {
    path: 'dashboard',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
          canActivate: [AuthGuard],
          data: { roles: ['consultant' , 'teamLead', 'manager', 'Rh', 'Infra', 'treasurer','admin','director','finance'] }

      },
      {
        path: 'reset/:id',
        component: ResetpasswordComponent,
        data: {
          title: 'Reset List',
          data: { roles: ['consultant' , 'teamLead', 'manager', 'Rh', 'Infra', 'treasurer','admin','director','finance'] }

        },     
      },

      {
        path: 'detail/:id',
        component: UpdateprofileComponent,
        data: {
          title: 'Profile List',
          data: { roles: ['consultant' , 'teamLead', 'manager', 'Rh', 'Infra', 'treasurer','admin','director','finance'] }

        },   
      },     
      {
        path: 'setup',
        loadChildren: () =>
          import('./setup/setup.module').then((m) => m.SetupModule),
          canActivate: [AuthGuard],
          data: { roles: ['admin'] }

      },
      {
        path: 'auth',
        loadChildren: () =>
          import('./auth/auth.module').then((m) => m.AuthModule)

      },
      {
        path: 'requestleave',
        loadChildren: () =>
          import('./requestleave/requestleave.module').then((m) => m.RequestleaveModule),
          canActivate: [AuthGuard],
          data: { roles: ['consultant' , 'teamLead', 'manager', 'Rh', 'Infra', 'treasurer','finance'] }


      },
      {
        path: 'logout',
        component: LogoutComponent,
        data: {
          title: 'Register Page'
        }
      },
      {
        path: 'settings',
        component: SettingsComponent,
        data: {
          title: 'Login Page'
        }
      },
      {
        path: 'profile/:id',
        component: EmployeProfileComponent,
        data: {
          title: 'Login Page'
        }
      },
      {
        path: 'requestAuthorization',
        loadChildren: () =>
          import('./requestauthorization/requestauthorization.module').then((m) => m.RequestauthorizationModule),
          canActivate: [AuthGuard],
          data: { roles: ['consultant' , 'teamLead', 'manager', 'Rh', 'Infra', 'treasurer','finance'] }

      },
      {
        path: 'requestvalidations',
        loadChildren: () =>
          import('./requestvalidations/requestvalidations.module').then((m) => m.RequestvalidationsModule),
          canActivate: [AuthGuard],
          data: { roles: ['consultant' , 'teamLead', 'manager', 'Rh', 'Infra', 'treasurer', 'director','finance'] }

      },
      {
        path: 'requestadministrative',
        loadChildren: () =>
          import('./requestadministrative/requestadministrative.module').then((m) => m.RequestadministrativeModule),
          canActivate: [AuthGuard],
          data: { roles: ['consultant' , 'teamLead', 'manager', 'Rh', 'Infra', 'treasurer','finance'] }

      },
      {
        path: 'requestequipment',
        loadChildren: () =>
          import('./requestequipment/requestequipment.module').then((m) => m.RequestequipmentModule),
          canActivate: [AuthGuard],
          data: { roles: ['consultant' , 'teamLead', 'manager', 'Rh', 'Infra', 'treasurer'] }

      },
      
    ]
  },
  

  {path: '**', redirectTo: 'dashboard'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking'
      // relativeLinkResolution: 'legacy'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

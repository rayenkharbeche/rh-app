
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CreateAuthorizationComponent } from './create-authorization/create-authorization.component';
import { AuthorizationleavelistComponent } from './authorizationleavelist/authorizationleavelist.component';




const routes: Routes = [
  {
    path: '',
    data: {
      title: 'request authorization',
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'cards',
      },
      {
        path: 'addAuthorizationleave',
        component: CreateAuthorizationComponent,
        data: {
          title: 'Add Authorization',
        },
      },
      {       
        path: 'requestAuthorizationlist',
        component: AuthorizationleavelistComponent,
        data: {
          title: 'requestAuthorization list',
        },
      },
      {
        path: 'detail/:id',
        component: CreateAuthorizationComponent,
        data: {
          title: 'requestAuthorization list',
        },
      },    
       
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequestauthorizationRoutingModule { }




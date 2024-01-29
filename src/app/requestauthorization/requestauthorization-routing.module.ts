
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CreateAuthorizationComponent } from './create-authorization/create-authorization.component';
import { AuthorizationRequestlistComponent } from './authorizationrequestlist/authorizationrequestlist.component';




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
        component: AuthorizationRequestlistComponent,
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




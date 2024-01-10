
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CreateAuthorizationComponent } from './create-authorization/create-authorization.component';




const routes: Routes = [
  {
    path: '',
    data: {
      title: 'request leave',
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
       
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequestauthorizationRoutingModule { }




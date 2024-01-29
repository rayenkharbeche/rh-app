import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateRequestAdministrativeComponent } from './create-request-administrative/create-request-administrative.component';
import { RouterModule, Routes } from '@angular/router';
import { AdministrativeListComponent } from './administrative-list/administrative-list.component';





const routes: Routes = [
  {
    path: '',
    data: {
      title: 'request administrative',
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'cards',
      },
      {
        path: 'addrequestadministrative',
        component: CreateRequestAdministrativeComponent,
        data: {
          title: 'Add request administrative',
        },
      },
      {
        path: 'requestadministrativelist',
        component: AdministrativeListComponent,
        data: {
          title: 'request administrative List',
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
export class RequestadministrativeRoutingModule { }


import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RequestLeavevalidationsComponent } from './request-leavevalidations/request-leavevalidations.component';
import { RequestAuthorizationValidationComponent } from './request-authorization-validation/request-authorization-validation.component';
import { RequestAdministrativeValidationComponent } from './request-administrative-validation/request-administrative-validation.component';
import { RequestequipmentValidationComponent } from './requestequipment-validation/requestequipment-validation.component';
import { RequestequipmenteditComponent } from './requestequipmentedit/requestequipmentedit.component';
import { RequestsickvalidationComponent } from './requestsickvalidation/requestsickvalidation.component';
import { RequestCancelvalidationComponent } from './request-cancelvalidation/request-cancelvalidation.component';





const routes: Routes = [
  {
    path: '',
    data: {
      title: 'request leave validations',
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'cards',
      },
      {
        path: 'requestLeavevalidations',
        component: RequestLeavevalidationsComponent,
        data: {
          title: 'Request Leave validations',
        },
      },
      {
        path: 'requestsickvalidation',
        component: RequestsickvalidationComponent,
        data: {
          title: 'Request sick validations',
          roles: ['Rh','manager']
        },
      },
      {
        path: 'RequestCancelvalidation',
        component: RequestCancelvalidationComponent,
        data: {
          title: 'Request Cancel validation',
        },

      },
      {
        path: 'requestAuthorizationvalidations',
        component: RequestAuthorizationValidationComponent,
        data: {
          title: 'Request Authorization validations',
        },

      },
      {
        path: 'requestadministrativevalidation',
        component: RequestAdministrativeValidationComponent,
        data: {
          title: 'Request Administrative validations',
          roles: ['Rh']
        },
      },
      {
        path: 'requestequipmentvalidation',
        component: RequestequipmentValidationComponent,
        data: {
          title: 'Request Equipment validations',
          roles: ['Rh','treasurer','infra']
        },
      },
      
      {
        path: 'RequestequipmentanalyseComponent',
        component: RequestequipmentValidationComponent,
        data: {
          title: 'Request Equipment validations',
          roles: ['treasurer']
        },
      },
      {
        path: 'detail/:id',
        component: RequestequipmenteditComponent,
        data: {
          title: 'Profile List',
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
export class RequestvalidationsRoutingModule { }



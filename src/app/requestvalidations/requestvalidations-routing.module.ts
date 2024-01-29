
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RequestLeavevalidationsComponent } from './request-leavevalidations/request-leavevalidations.component';
import { RequestAuthorizationValidationComponent } from './request-authorization-validation/request-authorization-validation.component';
import { RequestAdministrativeValidationComponent } from './request-administrative-validation/request-administrative-validation.component';
import { RequestequipmentValidationComponent } from './requestequipment-validation/requestequipment-validation.component';





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
          roles: ['Rh']
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




import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RequestLeavevalidationsComponent } from './request-leavevalidations/request-leavevalidations.component';





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
          title: 'Add request',
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



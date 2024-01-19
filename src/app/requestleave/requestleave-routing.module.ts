import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddRequestleaveComponent } from './add-requestleave/add-requestleave.component';
import { RouterModule, Routes } from '@angular/router';
import { RequestleavelistComponent } from './requestleavelist/requestleavelist.component';
import { UpdaterequestleaveComponent } from './updaterequestleave/updaterequestleave.component';
import { ValidatedSickLeaveComponent } from './validated-sick-leave/validated-sick-leave.component';



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
        path: 'addrequestleave',
        component: AddRequestleaveComponent,
        data: {
          title: 'Add request',
        },
      },
      {
        path: 'requestleavelist',
        component: RequestleavelistComponent,
        data: {
          title: 'request list',
        },
      },
      {
        path: 'detail/:id',
        component: UpdaterequestleaveComponent,
        data: {
          title: 'request list',
        },
      },     
      {
        path: 'validatedSickLeave',
        component: ValidatedSickLeaveComponent,
        data: {
          title: 'Sick Leave list',
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
export class RequestleaveRoutingModule { }



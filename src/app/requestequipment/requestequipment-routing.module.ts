
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreaterequestequipmentComponent } from './createrequestequipment/createrequestequipment.component';
import { RequestequipmentlistComponent } from './requestequipmentlist/requestequipmentlist.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'request Equipment',
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'cards',
      },
      {
        path: 'addrequestEquipment',
        component: CreaterequestequipmentComponent,
        data: {
          title: 'Add request',
        },
      },
      {
        path: 'requestEquipmentlist',
        component: RequestequipmentlistComponent,
        data: {
          title: 'list request',
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
export class RequestequipmentRoutingModule { }



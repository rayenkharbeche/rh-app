import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';




const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Setup',
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'cards',
      },
     
      
     
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: {
          title: 'Profile List',
        },
        
      },
      
     
     
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class DashboardRoutingModule { }

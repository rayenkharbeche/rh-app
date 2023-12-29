import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EntitymanagmentComponent } from './entitymanagment/entitymanagment.component';
import { ProfilemanagmentComponent } from './profilemanagment/profilemanagment.component';

import { ProfilelistComponent } from './profilelist/profilelist.component';
import { PostemanagmentComponent } from './postemanagment/postemanagment.component';
import { DepartmentmanagmentComponent } from './departmentmangment/departmentmanagment.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Base',
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'cards',
      },
      {
        path: 'entitymanagment',
        component: EntitymanagmentComponent,
        data: {
          title: 'Entity Managment',
        },
      },
      {
        path: 'profilemanagment',
        component: ProfilemanagmentComponent,
        data: {
          title: 'Profile Managment',
        },
        
      },
      {
        path: 'postemanagment',
        component: PostemanagmentComponent,
        data: {
          title: 'Poste Managment',
        },
        
      },
      {
        path: 'departmentmanagment',
        component: DepartmentmanagmentComponent,
        data: {
          title: 'Department Managment',
        },
        
      },
      {
        path: 'profileList',
        component: ProfilelistComponent,
        data: {
          title: 'Profile List',
        },
        
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class SetupRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EntitymanagmentComponent } from './entitymanagment/entitymanagment.component';
import { ProfilemanagmentComponent } from './profilemanagment/profilemanagment.component';

import { ProfilelistComponent } from './profilelist/profilelist.component';

import { PostemanagmentComponent } from './postemanagment/postemanagment.component';
import { DepartmentmanagmentComponent } from './departmentmangment/departmentmanagment.component';

import { UpdateprofileComponent } from './updateprofile/updateprofile.component';
import { SettingsComponent } from './settings/settings.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { AddConsultantComponent } from './add-consultant/add-consultant.component';
>

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
        
      },
      {
        path: 'detail/:id',
        component: UpdateprofileComponent,
        data: {
          title: 'Profile List',
        },
        
      },
      {
        path: 'settings',
        component: SettingsComponent,
        data: {
          title: 'Settings List',
        },
        
      },
      {
        path: 'reset/:id',
        component: ResetpasswordComponent,
        data: {
          title: 'Reset List',
        },
        
      },
      {
        path: 'addConsulant',
        component: AddConsultantComponent,
        data: {
          title: 'Add',
        },
        
      },
      {
        path: 'equipmentmanagement',
        component: ProfilelistComponent,
        data: {
          title: 'Equipment Management ',
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

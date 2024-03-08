import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EntitymanagmentComponent } from './entitymanagment/entitymanagment.component';

import { ProfilelistComponent } from './profilelist/profilelist.component';

import { PostemanagmentComponent } from './postemanagment/postemanagment.component';
import { DepartmentmanagmentComponent } from './departmentmangment/departmentmanagment.component';

import { UpdateprofileComponent } from './updateprofile/updateprofile.component';
import { SettingsComponent } from './settings/settings.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { AddConsultantComponent } from './add-consultant/add-consultant.component';

import { TeamManagmentComponent } from './team-managment/team-managment.component';
import { CreateTeamComponent } from './create-team/create-team.component';
import { UpdateTeamComponent } from './update-team/update-team.component';
import { RolemanagmentComponent } from './rolemanagment/rolemanagment.component';
import { EmployeProfileComponent } from './employe-profile/employe-profile.component';
import { EquipmentmanagementComponent } from './equipmentmanagement/equipmentmanagement.component';
import { TransferEmployeeComponent } from './transfer-employee/transfer-employee.component';
import { GeneralControlComponent } from './general-control/general-control.component';
import { UsersImportComponent } from './users-import/users-import.component';
import { MailTemplateComponent } from './mail-template/mail-template.component';
import { MailTemplateListComponent } from './mail-template-list/mail-template-list.component';
import { HolidayManagmentComponent } from './holiday-managment/holiday-managment.component';


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
        path: 'teamManagment',
        component: TeamManagmentComponent,
        data: {
          title: 'Team Management ',
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
        path: 'update/:id',
        component: UpdateprofileComponent,
        data: {
          title: 'Profile List',
        },
        
      },
      {
        path: 'detail/:id',
        component: EmployeProfileComponent,
        data: {
          title: 'Detail',
        },
        
      },
      {
        path: 'equipmentmanagment/:id',
        component: EquipmentmanagementComponent,
        data: {
          title: 'Equipment managment',
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
      },
      {
        path: 'createTeam',
        component: CreateTeamComponent,
        data: {
          title: 'Team Management ',
        },

      },
      {
        path: 'updateteam/:id',
        component: UpdateTeamComponent,
        data: {
          title: 'Team Management ',
        },

      },
      {
        path: 'roleManagment',
        component: RolemanagmentComponent,
        data: {
          title: 'Role Management ',
        },      
      },
      {
        path: 'transferEmployee/:id',
        component: TransferEmployeeComponent,
        data: {
          title: 'Transfer Employee ',
        },      
      },
      {
        path: 'generalcontrol',
        component: GeneralControlComponent,
        data: {
          title: 'Transfer Employee ',
        },      
      },
      {
        path: 'usersImport',
        component: UsersImportComponent,
        data: {
          title: 'Employees Import ',
        },      
      },
      {
        path: 'mailTemplate',
        component: MailTemplateComponent,
        data: {
          title: 'Create Template ',
        },      
      },
      {
        path: 'mailTemplate/:id',
        component: MailTemplateComponent,
        data: {
          title: 'Update Template ',
        },      
      },
      {
        path: 'mailTemplateList',
        component: MailTemplateListComponent,
        data: {
          title: 'Employees Import ',
        },      
      },
      {
        path: 'holidaymanagment',
        component: HolidayManagmentComponent,
        data: {
          title: 'Employees Import ',
        },      
      },
  
     
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class SetupRoutingModule { }

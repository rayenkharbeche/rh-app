import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// CoreUI Modules
import {
  AccordionModule,
  AvatarModule,
  BadgeModule,
  BreadcrumbModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  CarouselModule,
  CollapseModule,
  DropdownModule,
  FormModule,
  GridModule,
  ListGroupModule,
  NavModule,
  PaginationModule,
  PlaceholderModule,
  PopoverModule,
  ProgressModule,
  SharedModule,
  SpinnerModule,
  TableModule,
  TabsModule,
  TooltipModule,
  UtilitiesModule
} from '@coreui/angular';

import { IconModule } from '@coreui/icons-angular';




// Components Routing
import { EntitymanagmentComponent } from './entitymanagment/entitymanagment.component';
import { SetupRoutingModule } from './setup-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { EntityService } from './service/entity.service';
import { AuthService } from '../auth/service/auth.service';
import { ProfilelistComponent } from './profilelist/profilelist.component';

import { PostemanagmentComponent } from './postemanagment/postemanagment.component';
import { PosteService } from './service/poste.service';
import { DepartmentService } from './service/department.service';
import { DepartmentmanagmentComponent } from './departmentmangment/departmentmanagment.component';
import { UpdateprofileComponent } from './updateprofile/updateprofile.component';
import { SettingsComponent } from './settings/settings.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { AddConsultantComponent } from './add-consultant/add-consultant.component';
import { TeamManagmentComponent } from './team-managment/team-managment.component';
import { TeamService } from './service/team.service';
import { CreateTeamComponent } from './create-team/create-team.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatSelectModule } from '@angular/material/select';

import { UpdateTeamComponent } from './update-team/update-team.component';
import { RolemanagmentComponent } from './rolemanagment/rolemanagment.component';
import { RoleService } from '../auth/service/role.service';
import { CreateentityComponent } from './createentity/createentity.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  imports: [
    CommonModule,
    SetupRoutingModule,
    FormsModule,
    CardModule,
    ButtonModule,
    GridModule,
    IconModule,
    ReactiveFormsModule,
    TabsModule,
    ProgressModule,
    TabsModule,
    FormModule,
    ButtonGroupModule,
    AvatarModule,
    TableModule,
  
    AccordionModule,
    BadgeModule,
    BreadcrumbModule,
    CollapseModule,
    UtilitiesModule,
    SharedModule,
    ListGroupModule,
    IconModule,
    PlaceholderModule,
    SpinnerModule,
    NavModule,
    TooltipModule,
    CarouselModule,
    
    DropdownModule,
    PaginationModule,
    PopoverModule,
    MatSelectModule,
  MatDialogModule,
  MatFormFieldModule,

  ],
  declarations: [
    EntitymanagmentComponent,
    ProfilelistComponent,UpdateprofileComponent,
    SettingsComponent,ResetpasswordComponent,
    TeamManagmentComponent,
    PostemanagmentComponent, 
    DepartmentmanagmentComponent,
    AddConsultantComponent,
    CreateTeamComponent,
    UpdateTeamComponent,
    RolemanagmentComponent,
    CreateentityComponent
    
  ],

  providers: [EntityService,
              AuthService,
              PosteService,
              DepartmentService,
              TeamService,
              RoleService
            ],



})
export class SetupModule {}

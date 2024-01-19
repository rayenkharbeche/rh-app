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
import { MatTableModule } from '@angular/material/table';
import { EntityService } from './service/entity.service';
import { ProfilemanagmentComponent } from './profilemanagment/profilemanagment.component';
import { AuthService } from '../auth/service/auth.service';
import { ProfilelistComponent } from './profilelist/profilelist.component';
import { UpdateprofileComponent } from './updateprofile/updateprofile.component';
import { SettingsComponent } from './settings/settings.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { AddConsultantComponent } from './add-consultant/add-consultant.component';
<<<<<<< Updated upstream
=======
import { TeamManagmentComponent } from './team-managment/team-managment.component';
import { TeamService } from './service/team.service';
import { CreateTeamComponent } from './create-team/create-team.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { UpdateTeamComponent } from './update-team/update-team.component';
import { RolemanagmentComponent } from './rolemanagment/rolemanagment.component';
import { RoleService } from '../auth/service/role.service';

>>>>>>> Stashed changes

@NgModule({
  imports: [
    CommonModule,
    SetupRoutingModule,
    MatButtonModule,
    MatTableModule,
    FormsModule,
    CardModule,
    ButtonModule,
    GridModule,
    IconModule,
    ReactiveFormsModule,
    TabsModule,
    ProgressModule,
    ReactiveFormsModule,
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
    
    
  ],
  declarations: [
    EntitymanagmentComponent,
<<<<<<< Updated upstream
    ProfilemanagmentComponent,ProfilelistComponent,UpdateprofileComponent,
    SettingsComponent,ResetpasswordComponent,AddConsultantComponent
    
  ],
  providers: [EntityService,AuthService],
=======
    TeamManagmentComponent,
    ProfilelistComponent,
    PostemanagmentComponent, 
    DepartmentmanagmentComponent,
    ProfilelistComponent,
    UpdateprofileComponent,
    SettingsComponent,
    ResetpasswordComponent,
    AddConsultantComponent,
    CreateTeamComponent,
    UpdateTeamComponent,
    RolemanagmentComponent
    
  ],
  providers: [EntityService,
              AuthService,
              PosteService,
              DepartmentService,
              TeamService,
              RoleService
            ],
>>>>>>> Stashed changes


})
export class SetupModule {}

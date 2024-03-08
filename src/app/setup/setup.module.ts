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
import { EquipmentService } from './service/equipment.service';
import { EmployeProfileComponent } from './employe-profile/employe-profile.component';
import { EquipmentmanagementComponent } from './equipmentmanagement/equipmentmanagement.component';
import { YesNoPipe } from '../pipe/yes-no.pipe';
import { TransferEmployeeComponent } from './transfer-employee/transfer-employee.component';
import { GeneralControlComponent } from './general-control/general-control.component';
import { GeneralcontrolService } from './service/generalcontrol.service';
import { UsersImportComponent } from './users-import/users-import.component';
import { DateAgoPipe } from '../pipe/TimeAgoExtendsPipe.pipe';
import { MailTemplateComponent } from './mail-template/mail-template.component';
import { MailTemplateService } from './service/mailTemplate.service';
import { MailTemplateListComponent } from './mail-template-list/mail-template-list.component';
import { HolidayManagmentComponent } from './holiday-managment/holiday-managment.component';
import { HolidayService } from '../requestleave/service/holiday.service';
import { HolidayDataService } from './service/holiday-data.service';

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
    CreateentityComponent,
    EmployeProfileComponent,
    EquipmentmanagementComponent,
    TransferEmployeeComponent,
    GeneralControlComponent,
    UsersImportComponent,
    YesNoPipe,
    DateAgoPipe,
    MailTemplateComponent,
    MailTemplateListComponent,
    HolidayManagmentComponent
    
  ],

  providers: [EntityService,
              AuthService,
              PosteService,
              DepartmentService,
              TeamService,
              RoleService,
              EquipmentService,
              GeneralcontrolService,
              MailTemplateService,
              HolidayService, /*asuppr*/
              HolidayDataService
            ],



})
export class SetupModule {}

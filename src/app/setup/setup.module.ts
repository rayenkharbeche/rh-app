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

import { PostemanagmentComponent } from './postemanagment/postemanagment.component';
import { PosteService } from './service/poste.service';
import { DepartmentService } from './service/department.service';
import { DepartmentmanagmentComponent } from './departmentmangment/departmentmanagment.component';
import { UpdateprofileComponent } from './updateprofile/updateprofile.component';
import { SettingsComponent } from './settings/settings.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { AddConsultantComponent } from './add-consultant/add-consultant.component';


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

    ProfilemanagmentComponent,ProfilelistComponent,PostemanagmentComponent, DepartmentmanagmentComponent,ProfilelistComponent,UpdateprofileComponent,
    SettingsComponent,ResetpasswordComponent,AddConsultantComponent

    
  ],
  providers: [EntityService,AuthService,PosteService, DepartmentService],


})
export class SetupModule {}

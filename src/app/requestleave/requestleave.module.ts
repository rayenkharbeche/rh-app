import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestleaveRoutingModule } from './requestleave-routing.module';
import { AddRequestleaveComponent } from './add-requestleave/add-requestleave.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccordionModule, AvatarModule, BadgeModule, BreadcrumbModule, ButtonGroupModule, ButtonModule, CardModule, CollapseModule, FormModule, GridModule, ListGroupModule, ProgressModule, SharedModule, TableModule, TabsModule, UtilitiesModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { RequestleaveService } from './service/requestleave.service';
import { RequestleavelistComponent } from './requestleavelist/requestleavelist.component';

import { UpdaterequestleaveComponent } from './updaterequestleave/updaterequestleave.component';
import { ValidatedSickLeaveComponent } from './validated-sick-leave/validated-sick-leave.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

import {  MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';



import { MatRippleModule } from '@angular/material/core';




@NgModule({
  declarations: [
    AddRequestleaveComponent,
    RequestleavelistComponent,
    UpdaterequestleaveComponent,
    ValidatedSickLeaveComponent
  ],
  imports: [
    CommonModule,
    RequestleaveRoutingModule,
    CommonModule,
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
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatDatepickerModule,     
    MatNativeDateModule 
     
    
  ],
  providers: [RequestleaveService,MatDatepickerModule]
})
export class RequestleaveModule { }

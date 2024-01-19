import { CommonModule } from '@angular/common';
import { RequestvalidationsRoutingModule } from './requestvalidations-routing.module';
import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccordionModule, AvatarModule, BadgeModule, BreadcrumbModule, ButtonGroupModule, ButtonModule, CardModule, CollapseModule, FormModule, GridModule, ListGroupModule, ProgressModule, SharedModule, TableModule, TabsModule, UtilitiesModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { RequestLeavevalidationsComponent } from './request-leavevalidations/request-leavevalidations.component';
import { RequestleaveService } from '../requestleave/service/requestleave.service';




@NgModule({
  declarations: [RequestLeavevalidationsComponent],
  imports: [
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
    CommonModule,
    RequestvalidationsRoutingModule
  ],
  providers: [RequestleaveService]
})
export class RequestvalidationsModule { }

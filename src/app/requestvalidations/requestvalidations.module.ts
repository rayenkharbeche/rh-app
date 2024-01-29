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
import { RequestAuthorizationValidationComponent } from './request-authorization-validation/request-authorization-validation.component';
import { AuthorizationService } from '../requestauthorization/service/authorization.service';
import { RequestAdministrativeValidationComponent } from './request-administrative-validation/request-administrative-validation.component';
import { RequestadministrativeService } from '../requestadministrative/service/requestadministrative.service';
import { RequestequipmentValidationComponent } from './requestequipment-validation/requestequipment-validation.component';
import { RequestequipmentService } from '../requestequipment/service/requestequipment.service';




@NgModule({
  declarations: [RequestLeavevalidationsComponent,
                RequestAuthorizationValidationComponent,
                RequestAdministrativeValidationComponent,
                RequestequipmentValidationComponent
              ],
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
  providers: [RequestleaveService,
    AuthorizationService,
    RequestadministrativeService,
  RequestequipmentService]
})
export class RequestvalidationsModule { }

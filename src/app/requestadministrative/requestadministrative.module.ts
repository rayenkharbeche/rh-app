import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateRequestAdministrativeComponent } from './create-request-administrative/create-request-administrative.component';

import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccordionModule, AvatarModule, BadgeModule, BreadcrumbModule, ButtonGroupModule, ButtonModule, CardModule, CollapseModule, FormModule, GridModule, ListGroupModule, ProgressModule, SharedModule, TableModule, TabsModule, UtilitiesModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { RequestadministrativeRoutingModule } from '../requestadministrative/requestadministrative-routing.module';

@NgModule({
  declarations: [CreateRequestAdministrativeComponent],

  imports: [
    CommonModule,
    RequestadministrativeRoutingModule,
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
    
  ],

})
export class RequestadministrativeModule { }

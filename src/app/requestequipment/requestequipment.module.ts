import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccordionModule, AvatarModule, BadgeModule, BreadcrumbModule, ButtonGroupModule, ButtonModule, CardModule, CollapseModule, FormModule, GridModule, ListGroupModule, ProgressModule, SharedModule, TableModule, TabsModule, UtilitiesModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';



import { RequestequipmentRoutingModule } from './requestequipment-routing.module';
import { CreaterequestequipmentComponent } from './createrequestequipment/createrequestequipment.component';
import { RequestequipmentService } from './service/requestequipment.service';
import { RequestequipmentlistComponent } from './requestequipmentlist/requestequipmentlist.component';



@NgModule({
  declarations: [CreaterequestequipmentComponent,RequestequipmentlistComponent],
  imports: [
    CommonModule,
    RequestequipmentRoutingModule,
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
  providers: [RequestequipmentService],

})
export class RequestequipmentModule { }

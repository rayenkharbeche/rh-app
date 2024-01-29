import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestauthorizationRoutingModule } from './requestauthorization-routing.module';
import { CreateAuthorizationComponent } from './create-authorization/create-authorization.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccordionModule, AvatarModule, BadgeModule, BreadcrumbModule, ButtonGroupModule, ButtonModule, CardModule, CollapseModule, FormModule, GridModule, ListGroupModule, ProgressModule, SharedModule, TableModule, TabsModule, UtilitiesModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { AuthorizationService } from './service/authorization.service';
import { AuthorizationRequestlistComponent } from './authorizationrequestlist/authorizationrequestlist.component';


@NgModule({
  declarations: [CreateAuthorizationComponent,
    AuthorizationRequestlistComponent
  ],
  imports: [
    CommonModule,
    RequestauthorizationRoutingModule,
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
  providers: [AuthorizationService
    
  ],
})
export class RequestauthorizationModule { }

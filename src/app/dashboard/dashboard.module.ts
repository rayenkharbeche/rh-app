import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { AvatarModule, ButtonGroupModule, ButtonModule, CardModule, FormModule, GridModule, NavModule, ProgressModule, TableModule, TabsModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartjsModule } from '@coreui/angular-chartjs';
import { RequestleaveService } from '../requestleave/service/requestleave.service';
import { AuthorizationService } from '../requestauthorization/service/authorization.service';
import { GeneralcontrolService } from '../setup/service/generalcontrol.service';

import { HighchartsChartModule } from 'highcharts-angular';
import { TimeAgoPipe } from 'time-ago-pipe';


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    CardModule,
    NavModule,
    IconModule,
    TabsModule,
    GridModule,
    ProgressModule,
    ReactiveFormsModule,
    ButtonModule,
    FormModule,
    ButtonModule,
    ButtonGroupModule,
    ChartjsModule,
    AvatarModule,
    TableModule,
    HighchartsChartModule,

  ],
    providers :    [RequestleaveService,
      AuthorizationService,
      GeneralcontrolService]
})
export class DashboardModule { }

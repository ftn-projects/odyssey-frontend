import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsPageComponent } from './stats-page/stats-page.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { AccommodationModule } from '../accommodation/accommodation.module';
import { LineGraphComponent } from './line-graph/line-graph.component';
import { AccommodationStatCardComponent } from './accommodation-stat-card/accommodation-stat-card.component';
import { AccommodationStatsExpandedComponent } from './accommodation-stats-expanded/accommodation-stats-expanded.component';
import { MaterialModule } from '../infrastructure/material/material.module';


@NgModule({
  declarations: [
    StatsPageComponent,
    LineGraphComponent,
    AccommodationStatCardComponent,
    AccommodationStatsExpandedComponent
  ],
  imports: [
    CommonModule,
    AccommodationModule,
    MaterialModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    })
  ]
})
export class StatsModule { }

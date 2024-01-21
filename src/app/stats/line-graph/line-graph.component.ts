import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { EChartsOption } from 'echarts';
import { TotalStats } from '../model/total-stats.model';
import { MonthlyStats } from '../model/monthly-stats.model';
import { AccommodationTotalStats } from '../model/accommodation-total-stats.model';

@Component({
  selector: 'app-line-graph',
  templateUrl: './line-graph.component.html',
  styleUrl: './line-graph.component.css'
})
export class LineGraphComponent implements OnChanges{

    @Input() stats?: MonthlyStats[];
    @Input() accommodationStats?: AccommodationTotalStats[];


    chartOption: EChartsOption = {
        title: {
          text: 'Monthly Income'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['Income']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: []
        },
        yAxis: {
          type: 'value'
        },
        series: []
      };

    constructor() { 
    }



    ngOnChanges(changes: SimpleChanges): void {
        const chartOptionIn: EChartsOption = {
            title: {
              text: 'Monthly Income'
            },
            animationDuration: 10000,
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data: ['Income']
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            toolbox: {
              feature: {
                saveAsImage: {}
              }
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: []
            },
            yAxis: {
              type: 'value'
            },
            series: []
          };
        chartOptionIn.xAxis = { type: 'category', boundaryGap: false, data: this.getMonthLabels(this.stats) };
        chartOptionIn.series = this.getSeriesData(this.stats, this.accommodationStats!);
        this.chartOption = chartOptionIn;
    }


      private getMonthLabels(stats : MonthlyStats[] | undefined): string[] {
    
        const stringArray: string[] = [];
        const size : number = stats?.length ?? 0;
        for (let i = 0; i < size ?? 0; i++) {
            const date = new Date(stats?.[i]?.month ?? 0);
            stringArray.push(date.toLocaleString('default', { year: 'numeric', month: 'short' }) || '');
        }
        return stringArray;
    }


    private getSeriesData(
        stats: MonthlyStats[] | undefined,
        accommodationStats: AccommodationTotalStats[]
      ): any[] {
        const allAccommodationIncomeSeries = accommodationStats?.map(
          (accStat) => ({
            name: accStat.accommodation?.title ?? 'Accommodation', // Use accommodation name if available
            type: 'line',
            smooth: true,
            
            data: accStat.monthlyStats?.map((m) => m.totalIncome) || [],
          })
        );
      
        return [
          {
            name: 'Total income',
            type: 'line',
            smooth: true,
            data: stats?.map((monthlyStat: MonthlyStats) => monthlyStat.totalIncome) || [],
          },
          ...allAccommodationIncomeSeries,
        ];
      }
}

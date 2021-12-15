import { Component, ElementRef, ViewChild } from '@angular/core';

import { AuthService } from '../../../../shared/services/auth/auth.service';
import { Chart } from 'chart.js';
import { ChartService } from '../../../../shared/services/chart/chart.service';
import { IUser } from 'src/app/shared/interfaces/user.interface';

/**
 * Charts Component
 *
 * @author Miguel Velásquez
 */
@Component({
  selector: 'app-charts',
  templateUrl: './charts.page.html',
  styleUrls: ['./charts.page.scss'],
})
export class ChartsPage {
  /**
   * The ChartJS Object Bar
   */
  public chartBar: Chart;

  /**
   * The ChartJS Object Lineal
   *
   * @var {any} chart
   */
  public chartLineal: Chart;

  /**
   * User Id
   */
  private userUid: string;

  /**
   * Chart points
   */
  private points: Array<number>;

  @ViewChild('linealChart') linealChart: ElementRef<HTMLCanvasElement>;
  @ViewChild('barChart') barChart: ElementRef<HTMLCanvasElement>;
  constructor(private chartService: ChartService, private authService: AuthService) {}

  /**
   * Initial method.
   * Create charts and set points.
   *
   * @author Miguel Velásquez
   */
  ionViewWillEnter(): void {
    this.points = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    // Chart.defaults.global.defaultFontFamily = 'Poppins-Medium';
    // Chart.defaults.global.defaultFontSize = 12;
    // Chart.defaults.line.spanGaps = true;
    this.createLinealChart();
    this.createChartBar();
    this.getData();
  }

  /**
   * get data of the rutes and set points.
   *
   * @author Miguel Velásquez
   */
  getData(): void {
    this.authService.isAuth().subscribe((auth: IUser) => {
      if (auth) {
        this.userUid = auth.uid;
        // this.registroService.getRegistros().subscribe(list => {
        //   list.map(item => {
        //     if (item.payload.val().userUid === this.userUid) {
        //       const month = new Date(item.payload.val().fecha).getMonth();
        //       this.points[month]++;
        //       this.chartService.points = this.points;
        //     }
        //   });
        // });
      }
    });
  }

  /**
   * Lineal Chart configuration.
   *
   * @author Miguel Velásquez
   */
  private async createLinealChart() {
    const ctx = this.linealChart.nativeElement.getContext('2d');

    const gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
    gradientStroke.addColorStop(0, '#80b6f4');
    gradientStroke.addColorStop(1, '#f49080');

    const data = await this.chartService.getPoints();

    this.chartLineal = new Chart(this.linealChart.nativeElement, {
      type: 'line',
      data: {
        labels: [
          'Ene',
          'Feb',
          'Mar',
          'Abr',
          'May',
          'Jun',
          'Jul',
          'Ago',
          'Sep',
          'Oct',
          'Nov',
          'Dic',
        ],
        datasets: [
          {
            label: 'Mis Rutas',
            data,
            fill: false,
            borderColor: gradientStroke,
            pointBorderColor: gradientStroke,
            pointBackgroundColor: gradientStroke,
            pointHoverBackgroundColor: gradientStroke,
            pointHoverBorderColor: gradientStroke,
            borderWidth: 2,
            pointRadius: 1,
            pointHoverRadius: 3,
          },
        ],
      },
      // options: {
      //   scales: {
      //     // And this will affect the horizontal lines (yAxe) of your dataset
      //     yAxes: [
      //       {
      //         gridLines: {
      //           // You can change the color, the dash effect, the main axe color, etc.
      //           display: false,
      //           zeroLineWidth: 0,
      //         },
      //         ticks: {
      //           stepSize: 10,
      //         },
      //       },
      //     ],
      //   },
      // },
    });
  }

  /**
   * Bar Chart configuration
   *
   * @author Miguel Velásquez
   */
  private createChartBar() {
    this.chartBar = new Chart(this.barChart.nativeElement, {
      type: 'bar',
      data: {
        labels: ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8'],
        datasets: [
          {
            label: 'Viewers in millions',
            data: [2.5, 3.8, 5, 6.9, 6.9, 7.5, 10, 17],
            backgroundColor: 'rgb(38, 194, 129)',
            borderColor: 'rgb(38, 194, 129)',
            borderWidth: 1,
          },
        ],
      },
      // options: {
      //   scales: {
      //     yAxes: [
      //       {
      //         ticks: {
      //           beginAtZero: true,
      //           stepSize: 10,
      //         },
      //       },
      //     ],
      //   },
      // },
    });
  }

  /**
   * Refresh page.
   *
   * @author Miguel Velásquez
   * @param event $event
   */
  public doRefresh(event: any): void {
    this.createLinealChart();
    setTimeout(() => {
      event.target.complete();
    }, 200);
  }
}

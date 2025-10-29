import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-view-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-summary.component.html',
  styleUrl: './view-summary.component.css'
})
export class ViewSummaryComponent {
 summary: any = {};
  chart: any;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getAllDetails().subscribe((res: any) => {
      this.summary = res[0];
      console.log(this.summary);
      this.createChart();
    });
  }

  createChart() {
    const ctx = document.getElementById('summaryChart') as HTMLCanvasElement;
    if (!ctx) return;

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [ 'Total Order','Pending', 'Assigned', 'Delivered',],
        datasets: [{
          label: 'Orders Summary',
          data: [
            this.summary.totalOrders,
            this.summary.totalCountOfPendingOrder,
            this.summary.totalCountOfAssignedOrder,
            this.summary.totalCountOfDeliveredOrder,
          ],
          backgroundColor: ['#FF6384', '#FFCE56', '#7bb2b2ff', '#175713ff']
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: { display: true, text: 'Orders Overview', font: { size: 18 } },
          legend: { display: false }
        },
        scales: { y: { beginAtZero: true } }
      }
    });
  }
}
  





  
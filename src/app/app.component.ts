import { FlowChartService } from './services/flow-chart.service';
import { AfterViewInit, Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('zoneFlowChart') zoneFlowChart: ElementRef = new ElementRef('')

  constructor(private flowChartService: FlowChartService) {

  }

  ngAfterViewInit(): void {
    const el = this.zoneFlowChart.nativeElement
    this.flowChartService.calculateDimensions(el)
  }
}

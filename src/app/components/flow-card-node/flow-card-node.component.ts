import { FlowChartService } from './../../services/flow-chart.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-flow-card-node',
  templateUrl: './flow-card-node.component.html',
  styleUrls: ['./flow-card-node.component.css']
})
export class FlowCardNodeComponent implements OnInit {
  @Input() dataIn: any;
  constructor(private flowChartService: FlowChartService) { }

  ngOnInit(): void {
  }

  callChilds(src: string, action: string): void {
    switch (action) {
      case 'youtubers':
        this.flowChartService.setDataYoutubers(src)
        break;
      default:
        this.flowChartService.setDataFromChild(src)
        break
    }

  }

}

import { FlowChartService } from './../../services/flow-chart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menu: Array<any> = []
  constructor(private flowChartService: FlowChartService) { }

  ngOnInit(): void {
    this.menu = [
      {
        name: 'ANGULAR',
        action: 'get_angular_team'
      },
      {
        name: 'REACT',
        action: 'get_react_team'
      },
      {
        name: 'GENERAL',
        action: 'get_general_team'
      }
    ]
  }

  callSource(): void {
    this.flowChartService.setDataFrom('angular')
  }

  callChild(): void {
    this.flowChartService.setDataFromChild('angular')
  }

}

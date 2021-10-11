import { FlowChartService } from './../../services/flow-chart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menu: Array<any> = []
  constructor(public flowChartService: FlowChartService) { }

  ngOnInit(): void {
    this.menu = [
      {
        name: 'PRIMER PASO',
        action: 'get_angular_team'
      },
      {
        name: 'EXAMPLE',
        action: 'get_react_team'
      },
      {
        name: 'EXAMPLE',
        action: 'get_general_team'
      }
    ]

    this.listener$()
  }

  callSource(): void {
    this.flowChartService.addStep()
  }

  listener$(): void {
    // this.flowChartService.formState$.subscribe(res => {
    //   if (res) {
    //     console.log('🆗🆗');
    //   }
    // })
  }



}

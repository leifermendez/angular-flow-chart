import { FlowChartService } from './../../services/flow-chart.service';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import * as shape from 'd3-shape';
import { Edge, Graph, GraphComponent, Layout } from '@swimlane/ngx-graph';
import { DagreNodesOnlyLayout } from 'src/app/services/layout.service';
import { stepRound } from 'src/app/services/stepRound';
import { Subject } from 'rxjs';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Step } from 'src/app/models/step';
import { ManagmentStateService } from 'src/app/services/managment-state.service';
@Component({
  selector: 'app-flow-chart',
  templateUrl: './flow-chart.component.html',
  styleUrls: ['./flow-chart.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlowChartComponent implements OnInit {
  @ViewChild('myChart') child!: GraphComponent;
  @ViewChild('wrapperForeign') wrapperForeign!: ElementRef;

  dimensions: [number, number] = [0, 0];
  showRender: boolean = false;
  flowForm: FormGroup = new FormGroup({})
  flowFormSteps: FormArray = new FormArray([])
  update$: Subject<boolean> = new Subject();
  dataNode: Array<any> = [] //TODO--> tarjetas
  dataLink: Array<any> = [] //TODO: ---> lineas verdes

  curve = stepRound;

  public layoutSettings = {
    orientation: 'LR' //TODO: Top-to-bottom  --> Left to Right
  };
  public layout: Layout = new DagreNodesOnlyLayout();

  constructor(
    private flowChartService: FlowChartService,
    private managmentState: ManagmentStateService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.listener$()
    this.iniFlowState()
  }

  private listener$(): void {
    this.flowChartService.zoneDimensions$.subscribe(([w, h]) => {
      if ((w) && (h)) {
        this.dimensions = [w, h]
        this.showRender = true;
        this.cd.detectChanges()
        this.callAfterLoad()
      }
    })
    //TODO: State principal
    const observer1$ = this.managmentState.steps$
      .subscribe((steps) => {
        const link = this.flowChartService.makeLinks(steps)
        this.dataLink = [...link]
        this.dataNode = [...steps]
        // this.update$.next(true)

        console.log('🎁LINK🎁', link);
        console.log('🎉NODE🎉', steps);

      })

    // this.flowChartService.data$.subscribe(data => {

    //   if (data) {
    //     const { node, link } = data


    //     //TODO: Layer formReactive
    //     this.setterSteps(node)

    //     //TODO: Layer ngx-grahp
    //     this.dataNode = [...node]
    //     this.dataLink = [...link]
    //   }
    // })
  }

  private callAfterLoad(): void {

    /* Recalculate Positions of endpoints while moving / dragging, added i as an identifier that it was moved */

    // tslint:disable-next-line:only-arrow-functions
    (this.child.layout as Layout).updateEdge = function (graph: Graph, edge: Edge): Graph {

      const sourceNode: any = graph.nodes.find(n => n.id === edge.source);
      const targetNode: any = graph.nodes.find(n => n.id === edge.target);

      // centered so i do not bother if its up oder downwards bot -1
      const dir = sourceNode.position.y <= targetNode.position.y ? -1 : -1;
      // Compute positions while dragging here
      const startingPoint = {
        x: sourceNode.position.x - dir * (sourceNode.dimension.height / 2) - 50,
        i: true,
        y: sourceNode.position.y,

      };
      const endingPoint = {
        x: targetNode.position.x - dir * (targetNode.dimension.height / 2) - 300,
        i: true,
        y: targetNode.position.y,

      };

      edge.points = [startingPoint, endingPoint];
      // console.log([startingPoint, endingPoint]);

      return graph;
    };

    /* Calculate Initial position of the Arrows, on first draw and add only amount of x if not modified or not dragged*/
    this.child.generateLine = function (points: any): any {

      const lineFunction = shape
        .line<any>()
        .x(d => {
          let addVal = 0;
          if (d.i === undefined) {
            addVal = 0;
          }
          const xval = d.x + addVal;
          return xval;
        })
        .y(d => d.y)
        .curve(this.curve);
      return lineFunction(points);
    };
  }

  public iniFlowState(): void {

    this.flowForm = new FormGroup(
      {
        name: new FormControl(
          'name',
          [
            Validators.required
          ]
        ),
        steps: new FormArray(
          [],
          [
            Validators.required
          ]
        ),
        status: new FormControl(
          true,
          [
            Validators.required,
            Validators.requiredTrue
          ]
        ),
      }
    )

  }

  public setterSteps(node: Step[]): void {
    // this.flowFormSteps.clear()
    // this.flowFormSteps = this.flowForm.get("steps") as FormArray;

    node.forEach((s: Step) => {
      const { structure, id, label, type } = s

      console.log(s);



      // this.dataNode.push(newFormStep)
    })
  }

  public removeStep(id: number): void {
    // const index = this.dataNode.findIndex(a => a.id === id)
    // console.log(`Remove index ${index}`);
    // this.dataNode.splice(index, 1)


    // this.dataLink.splice(index, 1)
    // this.dataLink.splice(index - 1, 1)
    // // this.dataLink.splice(index - 1, 1)

    // // this.dataNode = [...this.dataNode.splice(index, 1)]

    // this.flowFormSteps.removeAt(index)
    // this.update$.next(true)
  }

}

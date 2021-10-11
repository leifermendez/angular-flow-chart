import { StepObservable, StepState } from './../../services/managment-state.service';
import { Step } from './../../models/step';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FlowChartService } from 'src/app/services/flow-chart.service';
import { BehaviorSubject } from 'rxjs';
import { ManagmentStateService } from 'src/app/services/managment-state.service';

@Component({
  selector: 'app-sidebar-options',
  templateUrl: './sidebar-options.component.html',
  styleUrls: ['./sidebar-options.component.css'],
})
export class SidebarOptionsComponent implements OnInit {
  public elements: Tree = { step: undefined }
  private stateCurrent!: StepObservable

  constructor(
    private flowChartService: FlowChartService,
    private managmentState: ManagmentStateService
  ) { }

  ngOnInit(): void {
    this.listen$()
  }


  test(id: string): void {


  }

  listen$(): void {

    const observer1$ = this.flowChartService.stepSelect$
      .subscribe(res => {
        const tree: Tree = {
          step: res[0],
          element: res[1],
          subElement: res[2]
        };

        this.parseData(res)
        this.stateCurrent = this.managmentState.getStateFrom(tree)
      })
  }

  parseData(orderElements: any[]): void {
    const [step, element, subElement] = orderElements
    this.elements = {
      step, element, subElement
    }
    console.log(step, element, subElement);

  }

  addElement(typeIn: 'tooltip' | 'modal'): void {
    this.stateCurrent.statePrperties.set(
      'type', typeIn
    )
  }

  addSubElement(typeIn: 'img' | 'text'): void {
    const { state } = this.stateCurrent
    const { structure }: StepState = state
    const currentStructure = structure
    this.stateCurrent.statePrperties.set(
      'structure', [...currentStructure, ...[{ element: 'text' }]]
    )
  }

  changeColorText(index: number, option: number): void {
    const { state } = this.stateCurrent
    const { structure }: StepState = state
    const currentElement = structure[index]


    let style = {}

    switch (option) {
      case 1:
        style = {
          color: 'red',
          'background-color': 'yellow'
        }
        break;
      case 2:
        style = {
          color: 'green',
          'background-color': 'blue',
          'font-weigth': '600'
        }
        break;
      default:
        style = {
          color: 'white',
          'background-color': 'blue'
        }
        break;
    }


    const setValueStructure = {
      ...currentElement, ...{
        style
      }
    }
    console.log('______', structure[index]);

    structure[index] = setValueStructure

    console.log('🤦‍♂️🤦‍♂️🤦‍♂️___', structure[index]);

    this.stateCurrent.statePrperties.set(
      'structure', [...structure]
    )
  }

  //TODO: 🤔🤔🤔🤔🤔


  changeNode(step: 'tooltip' | 'modal'): void {
    // const mockTest: Step = {
    //   type: { type: step },
    //   id: this.stepSelect?.id,
    //   structure: this.stepSelect?.structure
    // }
    // this.flowChartService.setNodeValue(mockTest)
  }

  addTextElement(): void {
    // const observer1$: any = this.flowChartService.nodeSelectedElementChange$.find(i => i.key === `element_${this.stepSelect.id}`)
    // console.log('🆗🆗🤔🤔', observer1$);

    // observer1$.state.next('add_text')
  }

  addImgElement(): void {
    // const observer1$: any = this.flowChartService.nodeSelectedElementChange$.find(i => i.key === `element_${this.stepSelect.id}`)
    // console.log('🆗🆗🤔🤔', observer1$);

    // observer1$.state.next('add_img')
  }

}

export interface Tree {
  step: any;
  element?: any;
  subElement?: any;
}
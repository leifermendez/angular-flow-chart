import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FlowChartService } from 'src/app/services/flow-chart.service';
import { ManagmentStateService } from 'src/app/services/managment-state.service';
import { take, last, takeLast } from 'rxjs/operators'

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputTextComponent implements OnInit {

  @Input() key: string = ''
  @Input() index: number | undefined = undefined
  @Input() customStyle: string = ''
  public value: any;
  private currentState: any;

  constructor(
    private flowChartService: FlowChartService,
    private managmentState: ManagmentStateService,
    private cd: ChangeDetectorRef
  ) { }



  ngOnInit(): void {
    this.listen$()
  }

  listen$(): void {


    const { statePrperties } = this.managmentState.getStateFrom({
      step: this.key
    })


    statePrperties.get$
      .subscribe(({ structure }: any) => {
        const singleElement = structure[this.index as any]
        console.log('Dentro de INPUT ' + this.index + ' 🔴🔴', singleElement);
        // this.customStyle = 'papa'
        // console.log('aqui ando', singleElement.value, this.value);
        // this.value = singleElement.value
        // this.cd.markForCheck()
        // this.applyProps(singleElement)

        // this.dataIn = { ...this.dataIn, ...{ state } }
      })


  }

  updateSingle(event: string): void {
    const { state } = this.currentState
    const { structure } = state
    let mergeValue = structure[this.index as any]
    mergeValue = { ...mergeValue, ...{ value: event } }
    structure[this.index as any] = mergeValue
    console.log('Value entry', structure);
    this.currentState.statePrperties.set(
      'structure', [...structure]
    )
    // this.currentState

  }




  selectInput(event: MouseEvent): void {
    console.log('Only inpu text 🤦‍♂️', this.key, 1, this.index);
    this.flowChartService.passToSideBar(this.key, 1, this.index)
    // this.currentState = this.managmentState.getStateFrom({
    //   step: this.key
    // })


    //TODO esto se puede hacer en una directiva para reutilizar
    event.stopPropagation()
  }


}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { Step } from '../models/step';
import { ManagmentStateService, StepState } from './managment-state.service';

@Injectable({
  providedIn: 'root'
})
export class FlowChartService {


  public STEPS: Array<Step> = []
  public zoneDimensions$: BehaviorSubject<[number, number]> = new BehaviorSubject([0, 0])
  public stepSelect$: Subject<any> = new Subject
  // public data$: Subject<any> = new Subject
  // public nodeSelected$: BehaviorSubject<any> = new BehaviorSubject(null)
  // public nodeSelectedChange$: BehaviorSubject<any> = new BehaviorSubject(null)
  // public nodeSelectedElement$: BehaviorSubject<any> = new BehaviorSubject(null)
  // public nodeSelectedElementChange$: Array<{ key: string, state: BehaviorSubject<any> }> = []
  // public formState$: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private managmentState: ManagmentStateService) { }

  calculateDimensions(el: HTMLElement): void {
    const { width, height } = el.getBoundingClientRect()
    this.zoneDimensions$.next([width - 20, height - 8])
  }

  addStep(): void {

    const step: StepState = {
      type: undefined,
      id: Math.floor(Date.now() / 1000).toString(),
      structure: [],
      label: '_'
    }

    this.managmentState.createStepObservable(
      `step_${step.id}`,
      step
    )

  }

  passToSideBar(key: string, element?: number, index?: number): void {
    const tree = [key, element, index].filter(a => (a !== undefined))

    this.stepSelect$.next(tree)
  }

  //TODO No tocar 🔴
  public makeLinks(steps: Step[]): any {

    let link: any[] = []
    // Si no tiene valores retornamos 
    if (!steps.length) {

      return steps
    }

    if (steps.length) {
      link = steps.map((step, index) => {
        if (index) {
          console.log('---SOURCE--', steps[index - 1].id);

          return {
            id: `link_${index}`, // 1>
            source: steps[index - 1].id,
            target: step.id,
            label: 'is parent of'
          }
        } else {
          return null
        }
      })

      link = link.filter(a => (a))

    }

    return link

  }

  //TODO all below deprecated

  selectCard(step: Step): void {
    // this.nodeSelected$.next(step)
  }

  setNodeValue(block: Step): void {
    // this.nodeSelectedChange$.next(block)
  }

  setFormState(form: any): void {
    // this.formState$.next(form)
  }

  getFromState(): any {
    // return this.formState$.getValue()
  }


}

import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { Tree } from "../components/sidebar-options/sidebar-options.component";
@Injectable({
  providedIn: 'root'
})
export class ManagmentStateService {
  private stepsObserverArray: Array<StepObservable> = []
  public steps$: BehaviorSubject<any> = new BehaviorSubject([])


  constructor() {

  }


  private getCurrentState(key: string, propertyKey: string): void {
    console.log('Get value', key);
  }

  private setState(key: string, propertyKey: string, value: any): void {
    const index = this.getIndex(key)
    const { state, statePrperties } = Object.assign({}, this.stepsObserverArray[index])
    const newData = {
      [propertyKey]: value
    }
    const updateState = { ...state, ...newData }
    let globalStep = [...this.stepsObserverArray]

    globalStep[index].state = updateState


    this.stepsObserverArray = globalStep

    statePrperties.get$.next(updateState)

  }

  private getIndex(key: string): any {
    return this.stepsObserverArray.findIndex(i => i.key === key)
  }


  /**
   * Public methods for call from service
   */

  public createStepObservable(key: string, state: StepState): void {

    const observable: StepObservable = {
      key,
      state,
      id: key,
      statePrperties: {
        get$: new Subject,
        get: (propertyKey: string) => this.getCurrentState(key, propertyKey),
        set: (propertyKey: string, value: any) => this.setState(key, propertyKey, value),
      }
    }

    console.log('-----', observable);
    console.log('🆗🆗🆗-', state);

    this.stepsObserverArray.push(observable)
    this.steps$.next(this.stepsObserverArray)
  }

  public getStateFrom(tree: Tree): StepObservable {
    const stepIndex = this.getIndex(tree.step)
    return this.stepsObserverArray[stepIndex]
  }

}

/**
 * Interface for managment state of Step
 */

export interface StepObservable {
  key: string;
  id?: string;
  state: StepState;
  statePrperties: any;
}

export interface StepState {
  id: string;
  label: string;
  structure: Array<StructureState>;
  type: 'tooltip' | 'modal' | undefined;
  status?: 'enabled' | 'disabled';
}

export interface StructureState {
  value: any;
  stateProperties: any
}
import { BehaviorSubject, Observable } from "rxjs";
import { StateProperties } from "./managment-state.service";


export class GentlemanStateObject {
  private state: any;
  private stateProperties: StateProperties = {};
  readonly observableSubject: BehaviorSubject<any>;

  constructor(state: any, stateProperties: StateProperties) {
    this.state = state;
    this.stateProperties = stateProperties;
    this.observableSubject = new BehaviorSubject(state);
  }

  getObservable(): Observable<any> {
    return this.observableSubject.asObservable();
  }

  /**
   * @desc returns the state properties object
   * @return StateProperties
   */
  getStateProperties(): StateProperties {
    return this.stateProperties;
  }
  setObservableValues(value: any, property: string | null = null, emit = true): void {
    this.setStateValues(value, property);
    if (emit) {
      this.observableSubject.next(this.state);
    }
  }

  setStateValues(value: any, property: string | null): void {
    if (property && this.checkIfPropertyExists(this.state, property) !== undefined) {
      (this.state as any)[property] = value;
    } else {
      this.state = {
        ...this.state,
        ...value,
      };
    }
  }

  private checkIfPropertyExists(state: any, property: string): any {
    const condition = () => {
      return { met: state.hasOwnProperty(property), value: state[property] };
    };
    return this.checkIfConditionMet(() => condition(), 'Selected property not found ! check if the key is correct and exists');
  }

  private checkIfConditionMet(condition: () => any, errorMessage: string): any {
    const conditionMet = condition();
    if (!conditionMet.met) {
      console.error(errorMessage);
      throw Error(errorMessage);
    }
    return conditionMet.value;
  }
}

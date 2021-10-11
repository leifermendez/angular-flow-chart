import { FormGroup } from '@angular/forms';
import { Component, Input, OnInit, ChangeDetectionStrategy, AfterViewInit, ComponentFactoryResolver, ViewChild, ViewContainerRef, Output, EventEmitter } from '@angular/core';
import { FlowChartService } from 'src/app/services/flow-chart.service';

import { ManagmentStateService } from 'src/app/services/managment-state.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit, AfterViewInit {
  @ViewChild('myContainer', { read: ViewContainerRef }) container!: ViewContainerRef
  public structure: any[] = [];

  @Input() key: string = ''


  constructor(private flowChartService: FlowChartService,
    private managmentState: ManagmentStateService) { }


  ngOnInit(): void {


    this.listen$()

  }

  ngAfterViewInit(): void {

  }

  listen$(): void {
    const { statePrperties } = this.managmentState.getStateFrom({
      step: this.key
    })


    statePrperties.get$.subscribe(({ structure }: any) => {
      console.log('Dentro del modal', structure);
      const formatStructure = structure.map((a: any) => {
        return { ...a, key: this.key }
      })

      this.structure = [...formatStructure]
    })

  }

  selectModal(event: MouseEvent): void {
    console.log('Only modal 🤦‍♂️');
    this.flowChartService.passToSideBar(this.key, 1)
    //TODO esto se puede hacer en una directiva para reutilizar
    event.stopPropagation()
  }

  trackByFn(index: number, item: any): any {
    return item.key;
  }
  private makeComponent(element: 'add_text' | 'add_img'): void {
    // this.container.remove()
    // if (element === 'add_text') {

    //   const factory = this.resolver.resolveComponentFactory(InputTextComponent)
    //   const txtComponent = this.container.createComponent(factory)
    //   this.formNode.patchValue({ 'structure': 'add_text' })
    //   // this.formNodeChange.emit(formRaw)
    //   // txtComponent.instance.valueTxtChange.subscribe(a => this)
    // }

    // if (element === 'add_img') {
    //   const factory = this.resolver.resolveComponentFactory(InputImgComponent)
    //   this.container.createComponent(factory)
    // }
  }

}

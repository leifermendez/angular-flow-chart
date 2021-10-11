import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Step } from './../../models/step';
import { FlowChartService } from './../../services/flow-chart.service';
import { Component, ComponentFactoryResolver, EventEmitter, Input, OnInit, Output, ViewChild, ViewContainerRef, AfterViewInit } from '@angular/core';
import { ManagmentStateService } from 'src/app/services/managment-state.service';
import { Tree } from '../sidebar-options/sidebar-options.component';



@Component({
  selector: 'app-flow-card-node',
  templateUrl: './flow-card-node.component.html',
  styleUrls: ['./flow-card-node.component.css']
})
export class FlowCardNodeComponent implements OnInit, AfterViewInit {
  @ViewChild('myContainer', { read: ViewContainerRef }) vc!: ViewContainerRef;
  @ViewChild('myElement', { read: ViewContainerRef }) viewElement!: ViewContainerRef;
  @Input() dataIn: any;
  @Output() cbRemove: EventEmitter<any> = new EventEmitter

  public stateCurrent: any;
  public formNode: FormGroup = new FormGroup({})

  constructor(
    private flowChartService: FlowChartService,
    private resolver: ComponentFactoryResolver,
    private managmentState: ManagmentStateService
  ) { }

  ngOnInit(): void {

    this.formNode = new FormGroup(
      {
        type: new FormControl('', [Validators.required]),
        structure: new FormControl([], [Validators.required]),
        id: new FormControl('', [Validators.required]),
        label: new FormControl('')
      }
    )
    this.listen$()


  }

  ngAfterViewInit(): void {

  }

  listen$(): void {
    const observer1$ = this.flowChartService.stepSelect$
      .subscribe(res => {
        const tree: Tree = {
          step: res[0],
          element: res[1],
          subElement: res[2]
        };
        const step = this.managmentState.getStateFrom(tree)
        console.log('-->', step);

        // const [step] = this.managmentState.getStateFrom(tree) as any
        this.stateCurrent = step.key
      })

    const { statePrperties } = this.managmentState.getStateFrom({
      step: this.dataIn.key
    })


    statePrperties.get$.subscribe((state: any) => {
      this.dataIn = { ...this.dataIn, ...{ state } }
    })


  }


  removeStep(id: string): void {
    this.cbRemove.emit(id)
  }

  private makeForm(dataRaw: Step): void {
    const { id, label, structure, type } = dataRaw
    console.log('🙌🙌', dataRaw);

    this.formNode.patchValue(
      { id, label, structure, type }
    )
  }

  private makeElement(data: Step): void {
    // this.viewElement.remove()
    // if (data.type.type === 'tooltip') {
    //   const factoryElement = this.resolver.resolveComponentFactory(TooltipComponent)
    //   this.viewElement.createComponent(factoryElement)
    // }

    // if (data.type.type === 'modal') {
    //   //TODO AQUI
    //   const factoryElement = this.resolver.resolveComponentFactory(ModalComponent)
    //   const instanceModal = this.viewElement.createComponent(factoryElement)
    //   instanceModal.instance.parentData = data
    //   instanceModal.instance.formNode = this.formNode
    // }

  }

  selectNode(block: any): void {
    console.log('touch', block);
    this.flowChartService.passToSideBar(block.key)
  }

  setNode(): void {
    // this.flowChartService.addStep({ type: 'modal' })
  }

  addElement(type: string): void {
    // if (type === 'image') {
    //   const factory = this.resolver.resolveComponentFactory(InputImgComponent)
    //   this.vc.createComponent(factory)
    //   this.dataIn.structure = ['component_image']
    // }

    // if (type === 'text') {
    //   const factory = this.resolver.resolveComponentFactory(InputTextComponent)
    //   this.vc.createComponent(factory)
    //   this.dataIn.structure = ['component_text']
    // }


  }

}

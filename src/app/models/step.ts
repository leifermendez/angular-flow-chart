
export interface Step {
    type: 'tooltip' | 'modal';
    id: string;
    structure: any;
    label?: string;
}


export interface FlowTpe {
    name: string;
    steps: Step[];
    status?: boolean;
}
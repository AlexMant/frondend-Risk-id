export interface ActionInterface {
    icon: string;
    label: string;
    event: string;
    tooltip: string;
    condition?: boolean;
    contains?: string;
    data?: string;
}

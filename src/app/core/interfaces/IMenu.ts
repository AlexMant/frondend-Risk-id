export interface IMenu {
    text: string,
    icon: string,
    routerLink?: string;
    children?: IMenuItem[]
    codigo?: string;
}
export interface IMenuItem {
    text: string,
    icon: string,
    routerLink: string;
    codigo?: string;
}

export interface listNotificaciones {
    text: string,
    fecha: string,
    titulo: string,
    tipo: string,
    
}
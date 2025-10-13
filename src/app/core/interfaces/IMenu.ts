export interface IMenu {
    text: string,
    icon: string,
    routerLink?: string;
    children?: IMenuItem[]
}
export interface IMenuItem {
    text: string,
    icon: string,
    routerLink: string;
}

export interface listNotificaciones {
    text: string,
    fecha: string,
    titulo: string,
    tipo: string,
    
}
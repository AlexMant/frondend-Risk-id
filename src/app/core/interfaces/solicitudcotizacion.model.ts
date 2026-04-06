export interface solicitud_usuario{
    idusuariogenerador?: number,
    idusuarioasignado?: number,
    idempresa?: number,
    estado?: number,
    tiposolicitud?: string,
    observacion?: string,
    iddireccion?: number,
    detalle_solicitud_usuario?: detalle_solicitud_usuario[]
}
export interface detalle_solicitud_usuario{

    idhardware?: number,
    iditems?: number,
    desitems?: string,
    vmarca?: string,
    vmodelo?: string,
    vserie?: string,
    cantidad?: number,
    vobservacion?: string,
    origen?: number,

}

export interface cotizacion_usuario{
    idusuariogenerador?: number,
    idempresa?: number,
    estado?: number,
    tiposolicitud?: string,
    observacion?: string,
    detalle_cotizacion_usuario?: detalle_cotizacion_usuario[]
}
export interface detalle_cotizacion_usuario{

    idhardware?: number,
    desitems?: string,
    vmarca?: string,
    vmodelo?: string,
    vserie?: string,
    cantidad?: number,
    vobservacion?: string,
    
}

export interface opcionesMenu{
    nombreComponente: string,
    accion: string
}
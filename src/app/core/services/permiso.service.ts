
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class PermisoService {


    constructor() {
        // // Ejemplo: permisos hardcodeados. Reemplaza por llamada a backend si es necesario
        // this.permisos = ['ver', 'agregar', 'editar', 'eliminar'].map(accion => `trabajadores_${accion}`);
        // console.log('Permisos cargados:', this.permisos);

        // Ejemplo de cómo cargar permisos desde el backend:

        const permisosBackend = [
            { nombreComponente: 'trabajadores', accion: 'ver' },
            { nombreComponente: 'trabajadores', accion: 'agregar' },
            { nombreComponente: 'trabajadores', accion: 'editar' }
        ];
        this.setPermisos(permisosBackend);

    }


    /**
    * Verifica si el usuario tiene permiso para una acción en un componente
    * @param componente nombre del componente (ej: 'trabajadores')
    * @param accion acción a verificar (ej: 'agregar')
    */
    tienePermisoCompuesto(componente: string, accion: string): boolean {
        // El permiso esperado es del tipo 'trabajadores_agregar', 'trabajadores_ver', etc.
        const permiso = `${componente}_${accion}`;
        return this.tienePermiso(permiso);
    }

    // Matriz de permisos por componente (solo acciones)
    private permisosPorComponente: { [componente: string]: string[] } = {
        trabajadores: ['ver', 'agregar', 'editar', 'eliminar'],
        // Agrega aquí otros componentes y sus acciones
    };

    private permisos: string[] = [];

    tienePermiso(permiso: string): boolean {
        return this.permisos.includes(permiso);
    }

    getPermisosPorComponente(componente: string): string[] {
        return this.permisosPorComponente[componente] || [];
    }

    /**
     * Método para setear permisos dinámicamente si se obtienen del backend
     * El backend debe enviar un array de objetos: { nombreComponente: string, accion: string }
     */
    setPermisos(permisosBackend: { nombreComponente: string, accion: string }[]) {
        this.permisos = permisosBackend.map(p => `${p.nombreComponente}_${p.accion}`);
    }
}

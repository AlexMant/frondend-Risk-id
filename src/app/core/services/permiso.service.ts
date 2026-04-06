
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class PermisoService {

    private permisos: string[] = [];

    constructor() {
        // Ejemplo de carga desde localStorage:
        const userInfo = JSON.parse(localStorage.getItem("userInfo") || '{}');
        const permisosBackend = userInfo?.componenteMenu || [];
        this.setPermisos(permisosBackend);
    }

    /**
     * Verifica si el usuario tiene permiso para una acción en un componente usando el código
     * @param codigo código del componente (ej: 'ADMIN_EMPRESA')
     * @param accion acción a verificar (ej: 'agregar')
     */
    tienePermisoCompuesto(codigo: string, accion: string): boolean {
        const permiso = `${codigo}_${accion}`;
        return this.tienePermiso(permiso);
    }

    tienePermiso(permiso: string): boolean {
        return this.permisos.includes(permiso);
    }

    /**
     * Método para setear permisos dinámicamente si se obtienen del backend
     * El backend debe enviar un array de objetos: { codigo: string, accion: string }
     */
    setPermisos(permisosBackend: { codigo: string, accion: string }[]) {
        this.permisos = permisosBackend.map(p => `${p.codigo}_${p.accion}`);
    }
}
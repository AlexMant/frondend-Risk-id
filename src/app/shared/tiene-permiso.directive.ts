import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { PermisoService } from '../core/services/permiso.service';

@Directive({
  selector: '[tienePermiso]'
})
export class TienePermisoDirective {
  private componente: string;
  private accion: string;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private permisoService: PermisoService
  ) {}

  @Input()
  set tienePermiso(valor: [string, string]) {
    this.componente = valor[0];
    this.accion = valor[1];
    this.updateView();
  }

  private updateView() {
    const permiso = `${this.componente}_${this.accion}`;
    if (this.permisoService.tienePermiso(permiso)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}

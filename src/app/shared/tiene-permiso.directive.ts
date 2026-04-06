import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { PermisoService } from '../core/services/permiso.service';

@Directive({
  selector: '[tienePermiso]'
})
export class TienePermisoDirective {
  private hasView = false;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private permisoService: PermisoService
  ) {}

  @Input()
  set tienePermiso(valor: [string, string]) {
    if (!valor || valor.length !== 2) {
      this.viewContainer.clear();
      this.hasView = false;
      return;
    }
    const [codigo, accion] = valor;
    if (this.permisoService.tienePermisoCompuesto(codigo, accion)) {
      if (!this.hasView) {
        this.viewContainer.createEmbeddedView(this.templateRef);
        this.hasView = true;
      }
    } else {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }
}

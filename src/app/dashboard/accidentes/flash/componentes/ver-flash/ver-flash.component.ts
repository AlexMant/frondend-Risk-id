import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/core/services/notification.service';
import { VmParametrosService } from 'src/app/core/viewmodel/vm-parametros.service';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FlashService } from 'src/app/core/services/flash.service';
// IMPORTS PDF
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-ver-flash',
  standalone: true,
  imports: [ReactiveFormsModule,
    SharedModule, MaterialModule, CommonModule],
  templateUrl: './ver-flash.component.html',
  styleUrl: './ver-flash.component.css'
})
export class VerFlashComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private snackbar: NotificationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _vmP: VmParametrosService,
    private flashService: FlashService,
  ) {

    if (!this.vmP.detalleflash || Object.keys(this.vmP.detalleflash).length === 0) {
      this.router.navigate(['./..'], {
        relativeTo: this.activatedRoute,
      });
    }
  }


  get vmP() {
    return this._vmP;
  }

  preloaddescarga: boolean = false;
  fechaOcurrencia: any;
  selectedFilesVer: Array<{ file: File }> = [];
  imageSrc: string | ArrayBuffer | null = null;
  ngOnInit(): void {
    console.log('detalle flash:', this.vmP.detalleflash);

    if (this.vmP.detalleflash.archivos && this.vmP.detalleflash.archivos.length > 0) {

      for (let archivo of this.vmP.detalleflash.archivos || []) {
        this.flashService.urlToFile(archivo.url, archivo.name, archivo.type).then(file => {
          // Ahora 'file' es un File real
          console.log("Archivo convertido a File:", file);
          this.selectedFilesVer.push({ file });

          if (this.selectedFilesVer.length == 1 && this.selectedFilesVer[0].file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = () => {
              this.imageSrc = reader.result;
            };
            reader.readAsDataURL(this.selectedFilesVer[0].file);
          } else {
            console.log('No se recibió un archivo de imagen válido');
          }


        })

      }
    } else {

      this.selectedFilesVer = [];
      this.imageSrc = null;

    }

    this.fechaOcurrencia = new Date(this.vmP.detalleflash.fechaOcurrencia).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
    }) + ' ' + new Date(this.vmP.detalleflash.fechaOcurrencia).toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }) + ' hrs.';

  }

  flash: any = this.vmP.detalleflash;

  imprimirpdf() {
    this.preloaddescarga = true;
    // Cargar logo como base64
    const logoPath = 'assets/img/logo_sin_fondo.png';
    fetch(logoPath)
      .then(res => res.blob())
      .then(blob => {
        const logoReader = new FileReader();
        logoReader.onload = () => {
          const logoBase64 = logoReader.result as string;

          // Si no hay archivos, solo genera el cuadro
          if (!this.selectedFilesVer || this.selectedFilesVer.length === 0) {
            const doc = new jsPDF();

            // Propiedades del PDF
            doc.setProperties({
              title: 'Reporte FLASH - RISKID',
              subject: 'Generado por RISKID.',
              author: 'RISKID',
              keywords: 'Reporte FLASH, informe, RISKID',
              creator: 'RISKID',
            });

            // Encabezado y logo
            const logoY = 10;
            const logoH = 18;
            const logoW = 36;
            const logoX = doc.internal.pageSize.getWidth() - logoW - 15;
            doc.addImage(logoBase64, 'PNG', logoX, logoY, logoW, logoH);
            doc.setFontSize(28);
            doc.setFont('helvetica', 'italic');
            doc.setTextColor(90, 90, 90);
            doc.text('Reporte', 70, logoY + logoH / 2, { baseline: 'middle' });
            doc.setFont('helvetica', 'italic');
            doc.setTextColor(30, 70, 130);
            doc.text('Flash', 107, logoY + logoH / 2, { baseline: 'middle' });

            // Sección incidente
            let y = 40;
            doc.setFontSize(14);
            doc.setFont('helvetica', 'italic');
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(30, 70, 130);
            const codigo = this.flash?.codigo ? `(${this.flash.codigo})` : '';
            doc.text('Incidente ', 15, y);
            doc.setFont('helvetica', 'italic');
            doc.setTextColor(90, 90, 90);
            doc.setFont('helvetica', 'bold');
            doc.text(codigo, 38, y);
            doc.setFontSize(14);
            doc.setFont('helvetica', 'italic');
            doc.setTextColor(90, 90, 90);
            const nombre = this.flash?.nombre || '';
            doc.text(nombre, 90, y);

            if (nombre.length > 40) y += 8;
            y += 8;
            if (this.flash?.descripcion) {
              doc.setFontSize(12);
              doc.setFont('helvetica', 'italic');
              doc.setTextColor(90, 90, 90);
              doc.text(this.flash.descripcion, 15, y, { maxWidth: 180 });
              y += Math.ceil((this.flash.descripcion.length / 90) * 8);
            }

            // Tabla replicando la estructura HTML
            const tableBody = [
              ['Tipo Ocurrencia:', this.flash?.tipoFlash?.nombre+'.' || ''],
              ['Fecha Ocurrencia:', this.fechaOcurrencia || ''],
              ['Reportado por:', this.flash?.reportadoPorUsuarioNombre+'.' || ''],
              ['Empresa y centro de trabajo:', `${this.flash?.empresaNombre || ''} - ${this.flash?.centroTrabajoNombre || ''}.`],
              ['Daño Real:', this.flash?.danoReal?.nombre+'.' || ''],
              ['Daño Potencial:', this.flash?.danoPotencial?.nombre+'.' || ''],
              ['Lugar Específico:', this.flash?.lugarEspecifico+'.' || ''],
              ['Medidas inmediatas:', this.flash?.medidaInmediata+'.' || ''],
            ];

            let startY = y + 6;
            autoTable(doc, {
              body: tableBody,
              startY: startY,
              theme: 'grid',
              styles: {
                fontSize: 12,
                cellPadding: 3,
                fillColor: [240, 240, 240],
                fontStyle: 'italic',
              },
              headStyles: {
                fillColor: [255, 255, 255],
                fontStyle: 'bold',
              },
              columnStyles: {
                0: { fontStyle: 'bold', fillColor: [243, 243, 243] },
                1: { fontStyle: 'italic', fillColor: [255, 255, 255] },
              },
            });

            const tableEndY = startY + 80;
            const pageWidth = doc.internal.pageSize.getWidth();
            const margin = pageWidth * 0.1;
            const imgWidth = pageWidth * 0.8;
            const maxImgHeight = 90;
            let imgHeight = 90;
            imgHeight = Math.min(imgHeight, maxImgHeight);
            const imgX = margin;
            const imgY = tableEndY + 24;
            doc.setDrawColor(204, 204, 204);
            doc.setLineWidth(1);
            doc.setFillColor(240, 240, 240);
            doc.roundedRect(imgX, imgY, imgWidth, imgHeight, 4, 4, 'D');
            // Texto centrado
            doc.setFontSize(16);
            doc.setFont('helvetica', 'italic');
            doc.setTextColor(150, 150, 150);
            doc.text('Espacio para fotografía', imgX + imgWidth / 2, imgY + imgHeight / 2, { align: 'center', baseline: 'middle' });

            // Pie de página
            const addFooter = (pageNumber: number) => {
              doc.setFontSize(6);
              doc.setTextColor(50);
              doc.text('La información contenida en este reporte proviene directamente desde el sitio risk-id', 20, doc.internal.pageSize.getHeight() - 16, { align: 'left' });
              doc.text('Para consultas dirigirse al sitio web.', 20, doc.internal.pageSize.getHeight() - 13, { align: 'left' });
              doc.setFont('helvetica', 'bold');
              doc.text('Elaborado por:', 20, doc.internal.pageSize.getHeight() - 10, { align: 'left' });
              doc.setFont('helvetica', 'normal');
              doc.text(' RISKID.', 38, doc.internal.pageSize.getHeight() - 10, { align: 'left' });
              doc.text(`Página ${pageNumber}`, doc.internal.pageSize.getWidth() / 2, doc.internal.pageSize.getHeight() - 4, { align: 'center' });
            };

            // Pie de página en cada página
            const pageCount = doc.getNumberOfPages();
            for (let i = 1; i <= pageCount; i++) {
              doc.setPage(i);
              addFooter(i);
            }
             doc.save(`Reporte Flash ${this.flash?.codigo || ''}.pdf`);
              this.preloaddescarga = false;
            return;
          }

          // Si hay archivos, sigue la lógica actual
          // Cargar todas las imágenes extra como base64
          const extraImages = this.selectedFilesVer.slice(1).filter(f => f.file.type.startsWith('image/'));
          const extraImagePromises = extraImages.map(f =>
            new Promise<string>((resolve) => {
              const reader = new FileReader();
              reader.onload = () => resolve(reader.result as string);
              reader.readAsDataURL(f.file);
            })
          );

          // Cargar la imagen principal
          const mainImagePromise = new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.readAsDataURL(this.selectedFilesVer[0].file);
          });

          Promise.all([mainImagePromise, ...extraImagePromises]).then(imagesBase64 => {
            const doc = new jsPDF();

            // Propiedades del PDF
            doc.setProperties({
              title: `Reporte FLASH ${this.flash?.codigo || ''} - RISKID`,
              subject: 'Generado por RISKID.',
              author: 'RISKID',
              keywords: 'Reporte FLASH, informe, RISKID',
              creator: 'RISKID',
            });

            // Pie de página
            const addFooter = (pageNumber: number) => {
              doc.setFontSize(6);
              doc.setTextColor(50);
              doc.text('La información contenida en este reporte proviene directamente desde el sitio risk-id', 20, doc.internal.pageSize.getHeight() - 16, { align: 'left' });
              doc.text('Para consultas dirigirse al sitio web.', 20, doc.internal.pageSize.getHeight() - 13, { align: 'left' });
              doc.setFont('helvetica', 'bold');
              doc.text('Elaborado por:', 20, doc.internal.pageSize.getHeight() - 10, { align: 'left' });
              doc.setFont('helvetica', 'normal');
              doc.text(' RISKID.', 38, doc.internal.pageSize.getHeight() - 10, { align: 'left' });
              doc.text(`Página ${pageNumber}`, doc.internal.pageSize.getWidth() / 2, doc.internal.pageSize.getHeight() - 4, { align: 'center' });
            };

            // Encabezado y logo
            const logoY = 10;
            const logoH = 18;
            const logoW = 36;
            const logoX = doc.internal.pageSize.getWidth() - logoW - 15;
            doc.addImage(logoBase64, 'PNG', logoX, logoY, logoW, logoH);
            doc.setFontSize(28);
            doc.setFont('helvetica', 'italic');
            doc.setTextColor(90, 90, 90);
            doc.text('Reporte', 70, logoY + logoH / 2, { baseline: 'middle' });
            doc.setFont('helvetica', 'italic');
            doc.setTextColor(30, 70, 130);
            doc.text('Flash', 107, logoY + logoH / 2, { baseline: 'middle' });

            // Sección incidente
            let y = 40;
            doc.setFontSize(14);
            doc.setFont('helvetica', 'italic');
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(30, 70, 130);
            const codigo = this.flash?.codigo ? `(${this.flash.codigo})` : '';
            doc.text('Incidente ', 15, y);
            doc.setFont('helvetica', 'italic');
            doc.setTextColor(90, 90, 90);
            doc.setFont('helvetica', 'bold');
            doc.text(codigo, 38, y);
            doc.setFontSize(14);
            doc.setFont('helvetica', 'italic');
            doc.setTextColor(90, 90, 90);
            const nombre = this.flash?.nombre || '';
            doc.text(nombre, 90, y);

            if (nombre.length > 40) y += 8;
            y += 8;
            if (this.flash?.descripcion) {
              doc.setFontSize(12);
              doc.setFont('helvetica', 'italic');
              doc.setTextColor(90, 90, 90);
              doc.text(this.flash.descripcion, 15, y, { maxWidth: 180 });
              y += Math.ceil((this.flash.descripcion.length / 90) * 8);
            }

            // Tabla replicando la estructura HTML
            const tableBody = [
              ['Tipo Ocurrencia:', this.flash?.tipoFlash?.nombre+'.' || ''],
              ['Fecha Ocurrencia:', this.fechaOcurrencia || ''],
              ['Reportado por:', this.flash?.reportadoPorUsuarioNombre+'.' || ''],
              ['Empresa y centro de trabajo:', `${this.flash?.empresaNombre || ''} - ${this.flash?.centroTrabajoNombre || ''}.`],
              ['Daño Real:', this.flash?.danoReal?.nombre+'.' || ''],
              ['Daño Potencial:', this.flash?.danoPotencial?.nombre+'.' || ''],
              ['Lugar Específico:', this.flash?.lugarEspecifico+'.' || ''],
              ['Medidas inmediatas:', this.flash?.medidaInmediata+'.' || ''],
            ];

            let startY = y + 6;
            autoTable(doc, {
              body: tableBody,
              startY: startY,
              theme: 'grid',
              styles: {
                fontSize: 12,
                cellPadding: 3,
                fillColor: [240, 240, 240],
                fontStyle: 'italic',
              },
              headStyles: {
                fillColor: [255, 255, 255],
                fontStyle: 'bold',
              },
              columnStyles: {
                0: { fontStyle: 'bold', fillColor: [243, 243, 243] },
                1: { fontStyle: 'italic', fillColor: [255, 255, 255] },
              },
            });

            const tableEndY = startY + 80;

            // Imagen principal
            const mainImgData = imagesBase64[0];
            const pageWidth = doc.internal.pageSize.getWidth();
            const margin = pageWidth * 0.1;
            const imgWidth = pageWidth * 0.8;
            const maxImgHeight = 90;
            let imgHeight = 90;
            imgHeight = Math.min(imgHeight, maxImgHeight);
            const imgX = margin;
            const imgY = tableEndY + 24;
            doc.setDrawColor(204, 204, 204);
            doc.setLineWidth(1);
            doc.setFillColor(255, 255, 255);
            doc.roundedRect(imgX, imgY, imgWidth, imgHeight, 4, 4, 'FD');
            doc.addImage(mainImgData, 'PNG', imgX, imgY, imgWidth, imgHeight, undefined, 'FAST');

            // Imágenes extra (dos por hoja)
            let imgIndex = 0;
            while (imgIndex < extraImages.length) {
              doc.addPage();
              // Encabezado y logo
              doc.addImage(logoBase64, 'PNG', logoX, logoY, logoW, logoH);
              doc.setFontSize(28);
              doc.setFont('helvetica', 'italic');
              doc.setTextColor(90, 90, 90);
              doc.text('Reporte', 70, logoY + logoH / 2, { baseline: 'middle' });
              doc.setFont('helvetica', 'italic');
              doc.setTextColor(30, 70, 130);
              doc.text('Flash', 107, logoY + logoH / 2, { baseline: 'middle' });
              // Incidente
              let yExtra = 40;
              doc.setFontSize(14);
              doc.setFont('helvetica', 'italic');
              doc.setFont('helvetica', 'bold');
              doc.setTextColor(30, 70, 130);
              doc.text('Incidente ', 15, yExtra);
              doc.setFont('helvetica', 'italic');
              doc.setTextColor(90, 90, 90);
              doc.setFont('helvetica', 'bold');
              doc.text(codigo, 38, yExtra);

              // Imágenes en la hoja
              for (let j = 0; j < 2 && imgIndex < extraImages.length; j++, imgIndex++) {
                const extraImgData = imagesBase64[imgIndex + 1];
                const imgYExtra = 70 + j * (imgHeight + 20);
                doc.setDrawColor(204, 204, 204);
                doc.setLineWidth(1);
                doc.setFillColor(255, 255, 255);
                doc.roundedRect(imgX, imgYExtra, imgWidth, imgHeight, 4, 4, 'FD');
                doc.addImage(extraImgData, 'PNG', imgX, imgYExtra, imgWidth, imgHeight, undefined, 'FAST');
              }
            }

            // Pie de página en cada página
            const pageCount = doc.getNumberOfPages();
            for (let i = 1; i <= pageCount; i++) {
              doc.setPage(i);
              addFooter(i);
            }
            doc.save(`Reporte Flash ${this.flash?.codigo || ''}.pdf`);
            this.preloaddescarga = false;
          });
        };
        logoReader.readAsDataURL(blob);
      });
  }
  cancelar() {
    console.log('cancelar');
    this.router.navigate(['./..'], {
      relativeTo: this.activatedRoute,
    });
  }

}

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/core/services/notification.service';
import { VmParametrosService } from 'src/app/core/viewmodel/vm-parametros.service';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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
  ) {

  }

  preloaddescarga: boolean = false;
  ngOnInit(): void {
  }

  flash: any = {
  }

  primirpdf() {


     // Referencia al bloque principal
  const block = document.querySelector('app-block');
  if (!block) return;

  html2canvas(block as HTMLElement).then(canvas => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    // Ajusta la imagen al ancho de la página
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pageWidth;
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

    // Si hay imágenes adicionales en flash.fotos (array de URLs)
    if (this.flash?.fotos && this.flash.fotos.length > 0) {
      let imgCount = 0;
      for (let i = 0; i < this.flash.fotos.length; i += 2) {
        pdf.addPage();
        let y = 20;
        for (let j = 0; j < 2 && (i + j) < this.flash.fotos.length; j++) {
          const imgUrl = this.flash.fotos[i + j];
          // Carga la imagen y la agrega al PDF
          // Para imágenes remotas, usa fetch y convierte a base64 si es necesario
          // Aquí se asume que son base64 o dataURL
          pdf.addImage(imgUrl, 'JPEG', 10, y, pageWidth - 20, (pageWidth - 20) * 0.75);
          y += (pageWidth - 20) * 0.75 + 10;
        }
      }
    }

    pdf.save('reporte-flash.pdf');
  });

  }
  cancelar() {
    console.log('cancelar');
    this.router.navigate(['./..'], {
      relativeTo: this.activatedRoute,
    });
  }

}

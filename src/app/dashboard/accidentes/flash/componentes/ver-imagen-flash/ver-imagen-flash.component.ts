import { Platform } from '@angular/cdk/platform';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-ver-imagen-flash',
  templateUrl: './ver-imagen-flash.component.html',
  styleUrl: './ver-imagen-flash.component.css'
})
export class VerImagenFlashComponent implements OnInit {


  imageSrc: string | ArrayBuffer | null = null;

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: { file: File, status: string, id: number }
    , private _bottomSheetRef: MatBottomSheetRef
    , public platform: Platform
    , private dialog: MatDialog
    , private _bottomSheet: MatBottomSheet,
  ) { }

ngOnInit() {
    if (this.data?.file && this.data.file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageSrc = reader.result;
      };
      reader.readAsDataURL(this.data.file);
    } else {
      console.log('No se recibió un archivo de imagen válido');
    }
  }
}

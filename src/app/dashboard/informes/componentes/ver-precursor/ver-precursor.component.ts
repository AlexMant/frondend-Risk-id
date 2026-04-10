import { Platform } from '@angular/cdk/platform';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-ver-precursor',

  templateUrl: './ver-precursor.component.html',
  styleUrl: './ver-precursor.component.css'
})
export class VerPrecursorComponent implements OnInit {



  imageSrc: string | ArrayBuffer | null = null;

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: {
      alertaId: number,
      descripcion: string,
      tipoAlerta: string,
      audio?: Array<{ url: string, name: string, type: string }>,
      imagen?: Array<{ url: string, name: string, type: string }>
    },
    private _bottomSheetRef: MatBottomSheetRef,
    public platform: Platform,
    private dialog: MatDialog,
    private _bottomSheet: MatBottomSheet,
  ) { }

  imageUrl: string | null = null;
  audioUrl: string | null = null;

  ngOnInit() {

    console.log('Archivo recibido en VerPrecursorComponent:', this.data);

    if (this.data.imagen && this.data.imagen.length > 0) {
      this.imageUrl = this.data.imagen[0].url;
    }
    if (this.data.audio && this.data.audio.length > 0) {
      this.audioUrl = this.data.audio[0].url;
    }
  }
}


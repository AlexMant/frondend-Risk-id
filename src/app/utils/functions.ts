import { formatDate } from "@angular/common";
import * as moment from "moment";
import { RutService } from "rut-chileno";
import * as CryptoJS from 'crypto-js';
import { FormGroup } from "@angular/forms";

import * as dni from 'global-dni';

export class Fx {
  static timeZone = "GMT";
  static locale = "es-CL";
  static shortDate = "d/M/yyyy"; //'dd-MM-yyyy'
  static shortDate2 = "dd-MM-yyyy";
  static homeDate = "EEEE dd MMMM";
  static time = "HH:mm";
  static shortDateTime = "dd-MM-yyyy HH:mm";
  static serviceDateTime = "yyyy-MM-dd HH:mm:ss";
  static number = "1.0-0";
  static monthName = "dd 'de' MMMM 'de' yyyy";

  constructor() { }
  static getJson(item: any) {
    try {
      return JSON.parse(item);
    } catch (error) {
      return [];
    }
  }

  static capitalizestring(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  
  static get_dni(pais: any, mantenedorForm: FormGroup, campo: any) {

    const rut2 = mantenedorForm.get(campo)?.value

    let formatDNI: any;
    let validaR: any;
    if (pais == 'CL') {
      formatDNI = dni.CL.format(rut2);
      validaR = dni.CL.validate(formatDNI)
    }
    if (pais == 'PE') {
      formatDNI = dni.PE.format(rut2);
      validaR = dni.PE.validate(formatDNI)
    }
    if (pais == 'ES') {
      formatDNI = dni.ES.format(rut2);
      validaR = dni.ES.validate(formatDNI)
    }
    console.log("formatDNI: " + formatDNI);
    console.log("validaR: " + validaR);


    if (validaR == false && (formatDNI != undefined || formatDNI == null)) {
      mantenedorForm.controls[campo].setErrors({ 'incorrect': true });

    } else {
      if (formatDNI != undefined) {

        mantenedorForm.patchValue({ [campo]: formatDNI });
      }
    }


  }
  static get_dniClear(pais: any, rut2: any) {
    let clear: any;

    if (pais == 'CL') { clear = dni.CL.clean(rut2) }
    if (pais == 'PE') { clear = dni.PE.clean(rut2) }
    if (pais == 'ES') { clear = dni.ES.clean(rut2) }
    if (pais == '') { clear =rut2 }
    return clear
  }
  static get_dniformat(pais: any, rut2: any) {
    let clear: any;
    console.log("rut2: " + rut2);
    console.log("pais: " + pais);
    if (pais == 'CL') { clear = dni.CL.format(rut2) }
    if (pais == 'PE') { clear = dni.PE.format(rut2) }
    if (pais == 'ES') { clear = dni.ES.format(rut2) }
    if (pais == '') { clear =rut2 }
    return clear
  }

  static encrypPass(value) {



    const pass = value
    const hash = CryptoJS.MD5(pass).toString();


    return hash;
  }

  static getSigna(ts) {
    const config = {
      appId: "5f15b3fd",
      secretKey: "2db0049ceaf02d78b2643ec06c94c0d1",
    }
    const md5 = CryptoJS.MD5(config.appId + ts).toString()
    const sha1 = CryptoJS.HmacSHA1(md5, config.secretKey)
    const signa = CryptoJS.enc.Base64.stringify(sha1)
    return signa
  }


  /**
   * angular.copy() copia desacoplada de un objeto
   * @param elementoJson
   * @returns
   */
  static copy(elementoJson: any) {
    return JSON.parse(JSON.stringify(elementoJson));
  }
  static setRutFormat(rut: any) {
    return new RutService().rutFormat(rut);
  }
  static setRutClean(rut: any) {
    return new RutService().rutClean(rut);
  }

  static getRutTranforma2(campo: any):string  {

    const out3_rut = new RutService().rutFormat(campo);
    const validaR = new RutService().validaRUT(out3_rut)

    // console.log(out3_rut)

    if (validaR == true && out3_rut != undefined) {
      return '';

    } else {
      if (out3_rut != undefined) {

       return out3_rut
      }else
      {
        return '';
      }
    }
  }

  static getRutTranforma(mantenedorForm: FormGroup, campo: any) {

    const rut2 = mantenedorForm.get(campo)?.value
    // console.log("rut2: " + rut2);

    // const out1_rut = this.rutService.getRutChile(2, rut2);
    // console.log("out1_rut: " + out1_rut);
    const out3_rut = new RutService().rutFormat(rut2);
    const validaR = new RutService().validaRUT(out3_rut)
    // console.log("out3_rut: " + out3_rut);


    // console.log(out3_rut)

    if (validaR == true && out3_rut != undefined) {
      mantenedorForm.controls[campo].setErrors({ 'incorrect': true });

    } else {
      if (out3_rut != undefined) {

        mantenedorForm.patchValue({ [campo]: out3_rut });
      }
    }
  }

  static edad1(fechaNac: string, fechaNow: string): number {
    const today = new Date(fechaNow);
    const birthDate = new Date(fechaNac);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
  static fechaInvertir(fechaString: string) {
    return moment(fechaString, "DD-MM-YYYY").format("YYYY-MM-DD");
  }
  static fechaInvertir2(fechaString: string) {
    return moment(fechaString, "DD-MM-YYYY").format("DD-MM-YYYY");
  }
  static isSameOrAfter(desde: string, hasta: string) {
    console.log("isSameOrAfter", desde, hasta);
    console.log("isSameOrAfter", moment(hasta, "DD-MM-YYYY").isSameOrAfter(moment(desde, "DD-MM-YYYY")));
    return moment(hasta, "DD-MM-YYYY").isSameOrAfter(moment(desde, "DD-MM-YYYY"));
  }

  static FormatFecha(f: string, formatoEntrada: string, formatoSalida: string) {
    return moment(f, formatoEntrada).format(formatoSalida);
  }
  static edad2(fechaNac: string, fechaNow: string): number {
    return moment(fechaNow, "YYYY-MM-DD").diff(moment(fechaNac, "YYYY-MM-DD"), "years");
  }

  static formatRut(rut) {
    if (rut === null || rut === undefined || rut === "") {
      return "";
    } else {
      return rut.replace(/[.-]/g, "").replace(/^(\d{1,2})(\d{3})(\d{3})(\w{1})$/, "$1.$2.$3-$4");
    }
  }

  static formatCurrency(value) {
    let resultado;
    if (value === undefined || null) {
      return "$0";
    } else {
      //return '$'+value.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ".");
      resultado = Number(value.toString());
      //console.log("currency: ",resultado)
      if (resultado >= 0) {
        return (
          "$" +
          value
            .toString()
            .replace(/\D/g, "")
            .replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ".")
        );
      } else {
        return (
          "-$" +
          value
            .toString()
            .replace(/\D/g, "")
            .replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ".")
        );
      }
    }
  }

  /**
   * Number.prototype.format(n, x, s, c)
   *
   * @param integer n: length of decimal
   * @param integer x: length of whole part
   * @param mixed   s: sections delimiter
   * @param mixed   c: decimal delimiter
   */

  static formatCurrencyV2(value) {
    if (value === undefined || null) {
      return "$0";
    } else {
      return (
        "$" +
        value
          .toString()
          .replace(/\D/g, "")
          .replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ".")
      );
    }
  }
  static floatToEuro(float) {
    var euroCurrency;
    euroCurrency = "\u20AC" + float.toLocaleString("nl-NL", { minimumFractionDigits: 2 });
    console.log(euroCurrency);
    return euroCurrency;
  }
  static formatNumber(value) {
    return value
      .toString()
      .replace(/\D/g, "")
      .replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ".");
  }

  static base64ToArrayBuffer(base64) {
    var binary_string = base64.replace(/\\n/g, "");
    binary_string = window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
  }

  static personaRazonSocialDesc(persona: any) {
    if (persona.RazonSocial != "") {
      return persona.RazonSocial;
    }
    return persona.Nombre + " " + persona.ApellidoPaterno + " " + persona.ApellidoMaterno;
  }
 
  static dateNow() {
    return formatDate(new Date(), this.monthName, this.locale, this.timeZone);
  }

  static formatShortDate(value) {
    if (!value) {
      return "";
    }
    return formatDate(value, this.shortDate, this.locale, this.timeZone);
  }
  static formatShortDate2(value) {
    if (!value) {
      return "";
    }
    return formatDate(value, this.shortDate2, this.locale, this.timeZone);
  }

  static formatShortDate3(value) {
    if (!value) {
      return "";
    }
    return formatDate(value, this.shortDateTime, this.locale, this.timeZone);
  }

  static upperCasePdf(value: string) {
    if (value == undefined || value == null) {
      return "";
    }
    return value.trim().toUpperCase();
  }
 

  static format(type, value) {
    try {
      if (type == "rut") {
        return Fx.formatRut(value);
      }

      if (type == "shortDate") {
        return formatDate(value, Fx.shortDate, Fx.locale, Fx.timeZone);
      }

      if (type == "shortDate2") {
        return formatDate(value, Fx.shortDate2, Fx.locale, Fx.timeZone);
      }

      if (type == "serviceDateTime") {
        return formatDate(value, Fx.serviceDateTime, Fx.locale);
      }

      if (type == "number") {
        return Fx.formatNumber(value);
      }
    } catch {
      //console.log("error el función 'format' type: " + type + ", value: " + value);
    }

    return value;
  }

  static toBase64(source) {
    var encodedSource = CryptoJS.enc.Base64.stringify(source);
    encodedSource = encodedSource.replace(/=+$/, "");
    encodedSource = encodedSource.replace(/\+/g, "-");
    encodedSource = encodedSource.replace(/\//g, "_");

    return encodedSource;
  }

  static isJson(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  static validaRut(rutCompleto: any) {
    let rut = this._cleanRut(rutCompleto);
    if (rut !== "") {
      var factor = 2,
        suma = 0,
        l = rut.length - 1,
        digitoOriginal = rut.slice(-1).toLowerCase(),
        digitoCalculado;

      while (l--) {
        suma += +rut[l] * factor;
        factor = factor === 7 ? 2 : ++factor;
      }

      digitoCalculado = 11 - (suma % 11);
      digitoCalculado = digitoCalculado === 11 ? 0 : digitoCalculado === 10 ? "k" : digitoCalculado;

      return "" + digitoCalculado === digitoOriginal;
    }
    /**/
    return true;
  }

  static _cleanRut(rut: any) {
    return rut !== undefined && rut != null
      ? rut
        //.replace(/\D+/g, '')
        .replace(/\./g, "")
        .replace(/\-/g, "")
        .trim()
      : "";
  }

  static arraysEqual(a: any, b: any) {
    try {
      //let resultado;
      //console.log("origen :",a)
      //console.log("nueva :",b)
      //console.log("equals :",a === b)
      //console.log("nulo :",a == null || b == null)
      //console.log("lenght :",a.length !== b.length)

      if (a === b) {
        return true;
      }
      if (a == null || b == null) {
        return false;
      }
      if (a.length !== b.length) {
        return false;
      }
      // If you don't care about the order of the elements inside
      // the array, you should sort both arrays here.
      // Please note that calling sort on an array will modify that array.
      // you might want to clone your array first.

      for (var i = 0; i < a.length; ++i) {
        //console.log("a[i].descripcion: ",a[i].descripcion)
        //console.log("b[i].descripcion: ",b[i].descripcion)

        //console.log("a[i].codigo: ",a[i].codigo)
        console.log("b[i].codigo: ", b[i].codigo);

        //console.log("a[i].observacion: ",a[i].observacion === "<empty string>" ? "" : a[i].observacion)
        //console.log("b[i].observacion: ",b[i].observacion === undefined ? "" : b[i].observacion)
        if (a[i].descripcion !== b[i].descripcion || a[i].codigo !== b[i].codigo || (a[i].observacion === "<empty string>" ? "" : a[i].observacion) !== (b[i].observacion === undefined ? "" : b[i].observacion)) {
          return false;
        }
      }

      return true;
    } catch (err) {
      console.log("Error comparar documentos sustentatorios originales con actuales: ", err);
      return false;
    }
  }
  static floatToUF(float) {
    var ufCurrency;
    ufCurrency = Number(float).toLocaleString("es-ES", { minimumFractionDigits: 2 });
    return ufCurrency;
  }


  static fechaConNombreDia(fecha: Date): string {
    const diaSemana = fecha.getDay();
    const diasSemana = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
    return `${fecha} (${diasSemana[diaSemana]})`;
  }
  static fechaConNombreDia2(fecha: Date): string {
    return `${fecha} (${fecha.toLocaleString("es-ES", { weekday: "long" })})`;
  }

  //funcion encriptar
  static encriptarpedido(texto: string): string {
    return CryptoJS.AES.encrypt(texto
      , 'conectar#32023armt;').toString();
     
    }
   
  //funcion desencriptar
  static desencriptarpedido(texto: string): string {
    return CryptoJS.AES.decrypt(texto , 'conectar#32023armt;').toString(CryptoJS.enc.Utf8);
  }


}

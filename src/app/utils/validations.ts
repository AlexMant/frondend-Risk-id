export class Val {

    static validaDocSelect(data: any) {
        var docs = data.filter(i => i.seleccion == true);
        return docs.length == 0 ? false : true;
    }

    static textbox(text: string) {
        if(text == null || text == undefined) {
            return false;
        }

        if(text.trim() == "") {
            return false;
        }

        return true;
    }

    static isBloquearAccionesAsistente(): Boolean {
        //console.log("sessionStorage.getItem('rol_user')",sessionStorage.getItem('rol_user'))
              return sessionStorage.getItem('rol_user')==='asistente' || sessionStorage.getItem('rol_user')==='' || sessionStorage.getItem('rol_user')===null
      } 


      static evaluaContenido(evaluar: string, salida:string) {
        if(evaluar == null || evaluar == undefined) {
            return salida;
        }

        if(evaluar.trim() == "") {
            return salida;
        }

        if(evaluar.trim() == "PROBLEMA") {
            return salida;
        }

        return evaluar;
    }

    static evaluaContenidoBool(evaluar: any) {
        var res;
        if(evaluar === null || evaluar === undefined  || evaluar === ''){
            res = true
        }
        else{
            res = false;
        }
        return res;  
    }

    /**
     * console.log centralizado
     * @param mensaje 
     * @param data 
     */
    static LOG(mensaje:string, data1:any=null, data2:any=null, data3:any=null, data4:any=null, data5:any=null, data6:any=null, data7:any=null){
        console.log(mensaje, data1, data2, data3, data4, data5, data5, data7);
    }
      
}
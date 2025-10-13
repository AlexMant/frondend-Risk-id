import { Pipe, PipeTransform } from '@angular/core';
import { TableHeadInterface } from '../interfaces/tableHead.model';
import * as moment from 'moment';

@Pipe({
    name: 'formatData'
})
export class FormatPipe implements PipeTransform {
    transform(value: TableHeadInterface, data: any) {
        if(value.type == 'date'){
           const VALUE_FORMAT = value.format;
           const FORMAT = 'l';
           let localedate = moment(data);
           localedate.locale('es');
           return VALUE_FORMAT != undefined && VALUE_FORMAT != null ?
            localedate.format(VALUE_FORMAT) : localedate.format(FORMAT);
        }else if(value.type == 'number'){
            return value.decimals != undefined && value.decimals != null ?
                `${value.prefix}${this.getNumber(data, value.decimals)}` :
                `${value.prefix}${this.getNumber(data)}`;
        }else{
            return data;
        }
    }

    getNumber(data:any, decimals?: number | undefined): string {
        return Number(data).toLocaleString(
            'es-CL',
            { minimumFractionDigits: decimals ? decimals : 0 }
        );
    }

}

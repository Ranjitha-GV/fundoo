import {Injectable} from '@angular/core';


@Injectable({

providedIn: 'root'

})

export class LoggerService {

static log(msg: any, obj = {}): void {

console.log(msg,obj);

}


static error(msg: string, obj = {}): void {

console.error(msg, obj);

}

}

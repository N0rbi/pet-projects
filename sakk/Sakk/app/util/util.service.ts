import { Injectable } from '@angular/core';

@Injectable()
export class UtilService {

    public uuidv4() :string {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);});
    }

    public removeItemFromArray(array : Array<any>, object : any) : boolean {
        let success : boolean = false;
        let index : number = -1;
        index = array.indexOf(object);
        if ( index >= 0) {
            array.splice(index, 1);
            success = true;
        }
        return success;
    }
}
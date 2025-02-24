import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CommonService {

  getSameValueOf(list: any[], criteria: string, value: any): number {
    if (!value) return 0;
  
    return list.filter(item => {
      const itemValue = item[criteria];
      
      if (typeof itemValue === 'number') {
        return itemValue === Number(value);
      }
      return itemValue.toString().toLowerCase().includes(value.toString().toLowerCase());
    }).length;
}
}
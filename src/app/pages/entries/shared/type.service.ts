import { Type } from './type.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TypeService {

  types: Type[] =[ new Type('expense','Despesa'),
                  new Type('revenue','Receita')]
  

  constructor() { }

  getTypeOptions(){
    return this.types
  }
}

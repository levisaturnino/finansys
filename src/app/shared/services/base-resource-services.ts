import { BaseResourceModel } from '../models/base-resource-model';

import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map,catchError } from 'rxjs/operators';
import { Injector } from '@angular/core';

export abstract class BaseResourceService<T extends BaseResourceModel>{

  http:HttpClient

  constructor(protected apiPath:string, protected injector: Injector){
    this.http = injector.get(HttpClient)
  }

  getAll():Observable<T[]>{
    return this.http.get(this.apiPath).pipe(
      catchError(this.handleError),
      map(this.jsonDataToCategories)
    )
  }

    getById(id: number):Observable<T>{
      const url = `${this.apiPath}/${id}`
    return this.http.get(url).pipe(
      catchError(this.handleError),
      map(this.jsonDataToResource)
    )
  }

    created(resource: T):Observable<T>{
    return this.http.post(this.apiPath,resource).pipe(
      catchError(this.handleError),
      map(this.jsonDataToResource)
    )
  }

  update(resource: T):Observable<T>{
    const url = `${this.apiPath}/${resource.id}`
  return this.http.put(url,resource).pipe(
    catchError(this.handleError),
    map(this.jsonDataToResource)
    )
  }

  delete(id: number):Observable<any>{
    const url = `${this.apiPath}/${id}`
  return this.http.delete(url).pipe(
    catchError(this.handleError),
    map(() => null)
    )
  }

  protected jsonDataToCategories(jsonData: any[]):T[]{
    const categories: T[] = [];
    jsonData.forEach(element => categories.push(element as T));
    return categories;
  }

  protected jsonDataToResource(jsonData: any):T{
    const categories: T[] = [];
    return jsonData as T;
  }

  protected handleError(error: any):Observable<any>{
    console.log("Erro na requisicao =>",error)
    return throwError(error);
  }
}
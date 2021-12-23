import { Entry } from './entry.model';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map,catchError, flatMap } from 'rxjs/operators';
import { API } from '../../../api-url-router';
import { CategoryService } from '../../categories/shared/category.service';

@Injectable({
  providedIn: 'root'
})

export class EntryService {

  private  apiPath: string = `${API.address}/entries`;

  constructor(private http: HttpClient,private categoryService: CategoryService) { }

  getAll():Observable<Entry[]>{
    return this.http.get(this.apiPath).pipe(
      catchError(this.handleError),
      map(this.jsonDataToEntries)
    )
  }

    getById(id: number):Observable<Entry>{
      const url = `${this.apiPath}/${id}`
    return this.http.get(url).pipe(
      catchError(this.handleError),
      map(this.jsonDataToEntry)
    )
  }

  created(entry: Entry): Observable<Entry> {
    return this.categoryService.getById(entry?.categoryId!).pipe(
      flatMap(category => {
        entry.category = category
        return this.http.post(this.apiPath, entry).pipe(
          catchError(this.handleError),
          map(this.jsonDataToEntry)
        )
      })
    )
  }

  update(entry: Entry): Observable<Entry> {
    const url = `${this.apiPath}/${entry.id}`
    return this.categoryService.getById(entry?.categoryId!).pipe(
      flatMap(category => {
        entry.category = category
        return this.http.put(url, entry).pipe(
          catchError(this.handleError),
          map(this.jsonDataToEntry)
        )
      })
    )
  }

  delete(id: number):Observable<any>{
    const url = `${this.apiPath}/${id}`
  return this.http.delete(url).pipe(
    catchError(this.handleError),
    map(() => null)
    )
  }

  private jsonDataToEntries(jsonData: any[]):Entry[]{
    const entries: Entry[] = [];

    jsonData.forEach(element => {
      const entry = Object.assign(new Entry(),element)
      entries.push(entry)
    });

    return entries;
  }

  private jsonDataToEntry(jsonData: any):Entry{
    const entries: Entry[] = [];
    return  Object.assign(new Entry(),jsonData)
  }

  private handleError(error: any):Observable<any>{
    console.log("Erro na requisicao =>",error)
    return throwError(error);
  }

}



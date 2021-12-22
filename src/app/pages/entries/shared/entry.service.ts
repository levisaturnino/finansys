import { Entry } from './entry.model';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map,catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class EntryService {

  private  apiPath: string = "https://apifinansys.herokuapp.com/entries";

  constructor(private http: HttpClient) { }

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

    created(entry: Entry):Observable<Entry>{
    return this.http.post(this.apiPath,entry).pipe(
      catchError(this.handleError),
      map(this.jsonDataToEntry)
    )
  }

  update(entry: Entry):Observable<Entry>{
    const url = `${this.apiPath}/${entry.id}`
  return this.http.put(url,entry).pipe(
    catchError(this.handleError),
    map(this.jsonDataToEntry)
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
    jsonData.forEach(element => entries.push(element as Entry));
    return entries;
  }

  private jsonDataToEntry(jsonData: any):Entry{
    const entries: Entry[] = [];
    return jsonData as Entry;
  }

  private handleError(error: any):Observable<any>{
    console.log("Erro na requisicao =>",error)
    return throwError(error);
  }

}



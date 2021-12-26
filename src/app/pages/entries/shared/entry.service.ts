import { Entry } from './entry.model';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { map,catchError, flatMap } from 'rxjs/operators';
import { API } from '../../../api-url-router';
import { CategoryService } from "../../categories/shared/CategoryService";
import { BaseResourceService } from '../../../shared/services/base-resource-services';

@Injectable({
  providedIn: 'root'
})

export class EntryService extends BaseResourceService<Entry> {
  constructor(protected injector: Injector,protected categoryService: CategoryService) {
    super(`${API.address}/entries`,injector,Entry.fromJson)
   }

  created(entry: Entry): Observable<Entry> {
    return this.categoryService.getById(entry?.categoryId!).pipe(
      flatMap(category => {
        entry.category = category
        return super.created(entry)
      })
    )
  }

  update(entry: Entry): Observable<Entry> {
    return this.categoryService.getById(entry?.categoryId!).pipe(
      flatMap(category => {
        entry.category = category
        return super.update(entry)
      })
    )
  }
}



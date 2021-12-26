import { Category } from './category.model';
import { Injectable, Injector } from '@angular/core';
import { API } from '../../../api-url-router';
import { BaseResourceService } from '../../../shared/services/base-resource-services';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class CategoryService extends BaseResourceService<Category> {

  constructor(protected inject: Injector) {
    super(`${API.address}/categories`, inject,Category.fromJson);
  }

}

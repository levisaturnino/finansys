import { Component, OnInit } from '@angular/core';
import { Category } from '../shared/category.model';
import { CategoryService } from "../shared/CategoryService";
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories: Category[] = []

  constructor(private categoryService: CategoryService, 
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show()
  this.categoryService.getAll().subscribe(
      categories => {
        this.spinner.hide()
        this.categories = categories},
      error => {
        this.spinner.hide()
        alert("Erro o carregar a lista")}
    )
  }

  deleteCategory(category:Category){

    const mustDelete = confirm('Deseja realmente excluir esse item?')
    if(mustDelete){
      this.spinner.show()
    this.categoryService.delete(category?.id!).subscribe(
      () =>{
        this.spinner.hide()
        this.categories = this.categories.filter(element => element != category)
      },
      () =>{ this.spinner.hide()
        alert("Erro ao tentar excluír")
      }
    )
  }
}
}
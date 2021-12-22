import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Category } from "../shared/category.model"
import { CategoryService } from '../shared/category.service';

import { Toast } from 'ngx-toastr';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit, AfterContentChecked {

  currentAction: string = ""
  categoryForm!: FormGroup;
  pageTitle: string = ""
  serverErrorMessage: string[] = []
  submittingForm: boolean = false
  category: Category = new Category()

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngAfterContentChecked(): void {
    this.setPageTitle()
  }
  setPageTitle() {
    if (this.currentAction == "new") {
      this.pageTitle = "Cadastro de Nova Categoria"
    } else {
      const categoryName  = this.category.name || ""
    this.pageTitle  = "Editando Categoria: "+this.category
    } 
   }

  ngOnInit(): void {
    this.setCurrentAction();
    this.setBuildCategoryForm();
    this.loadCategory();
  }

  private setBuildCategoryForm() {
    this.categoryForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null]
    });
  }

  private setCurrentAction() {
    if (this.route.snapshot.url[0].path == "new") {
      this.currentAction = "new"
    } else {
      this.currentAction = "edit"
    }
  }

  private loadCategory() {
    if (this.currentAction == "edit") {
      this.route.paramMap.pipe(
        switchMap(parameter => this.categoryService.getById(+parameter.get("id")!))
      ).subscribe(
        (category) => {
          this.category = category;
          this.categoryForm?.patchValue(category)
        },
        (error) => alert("Ocorreu um erro no servidor, tente mais tarde")
      )
    }
  }

}

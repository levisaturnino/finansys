import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Category } from "../shared/category.model"
import { CategoryService } from "../shared/CategoryService";

import { switchMap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit, AfterContentChecked {

  currentAction: string = ""
  categoryForm!: FormGroup;
  pageTitle: string = ""
  serverErrorMessages: string[] | undefined
  submittingForm: boolean = false
  category: Category = new Category()

  constructor(
    private toastr: ToastrService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService) { }

  ngAfterContentChecked(): void {
    this.setPageTitle()
  }
  setPageTitle() {
    if (this.currentAction == "new") {
      this.pageTitle = "Cadastro de Nova Categoria"
    } else {
      const categoryName = this.category.name || ""
      this.pageTitle = "Editando Categoria: " + this.category.name
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
      name: ['', [Validators.required, Validators.minLength(2)]],
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
      this.spinner.show()
      this.route.paramMap.pipe(
        switchMap(parameter => this.categoryService.getById(+parameter.get("id")!))
      ).subscribe(
        (category) => {
          this.spinner.hide()
          this.category = category;
          this.categoryForm?.patchValue(category)
        },
        (error) =>{ this.spinner.hide()
           alert("Ocorreu um erro no servidor, tente mais tarde")
        }
      )
    }
  }

  private createCategory() {
    const category: Category = Object.assign(new Category(), this.categoryForm.value)
    this.spinner.show()
    this.categoryService.created(category).subscribe(
      category =>{ this.actionsForSuccess(category)},
      error => this.actionsForError(error)
    )
  }

  private updateCategory() {

    const category: Category = Object.assign(new Category(), this.categoryForm.value)

    this.categoryService.update(category).subscribe(
      category => this.actionsForSuccess(category),
      error => this.actionsForError(error)
    )
  }

  private actionsForSuccess(category: Category) {
    this.spinner.hide()
    this.toastr.success("Solicita????o processada com sucesso!");

    // redirect/reload component page
    this.router.navigateByUrl("categories", { skipLocationChange: true }).then(
      () => this.router.navigate(['categories', category.id, "edit"])
    )
  }

  private actionsForError(error: any) {
    this.spinner.hide()
    this.toastr.error("Ocorreu um erro ao processar a sua solicita????o!");

    this.submittingForm = false
    if (error.status === 422) {
      this.serverErrorMessages = JSON.parse(error._body).errord
    } else {
      this.serverErrorMessages = ["Falha na comunica????o com o servidor. Por Favor, teste mais tarde."]
    }
  }

   submitForm(){
     this.submittingForm = true

     if(this.currentAction == "new"){
        this.createCategory();
     }else{
        this.updateCategory();
     }
  }
}
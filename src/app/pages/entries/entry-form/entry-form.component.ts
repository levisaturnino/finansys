import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Entry } from "../shared/entry.model"
import { EntryService } from '../shared/entry.service';

import { switchMap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Category } from '../../categories/shared/category.model';
import { CategoryService } from '../../categories/shared/category.service';
import { Type } from '../shared/type.model';
import { TypeService } from '../shared/type.service';
import { NgxSpinnerService } from 'ngx-spinner';



@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.css']
})
export class EntryFormComponent implements OnInit, AfterContentChecked {

  currentAction: string = ""
  entryForm!: FormGroup
  pageTitle: string = ""
  serverErrorMessages: string[] | undefined
  submittingForm: boolean = false
  entry: Entry = new Entry()
  categories: Array<Category> | undefined

  types: Array<Type> | undefined


  imaskConfig = {
    mask: Number,
    scale: 2,
    thousandsSeparator: "",
    padFractionalZeros: true,
    normalizeZeros:true,
    radix:","
  }

  ptBR = {
    firstDayOfWeek: 0,
    dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
    dayNamesMin: ['Do', 'Se', 'Te', 'Qu', 'Qu', 'Se', 'Sa'],
    monthNames: [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho',
      'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ],
    monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    today: 'Hoje',
    clear: 'Limpar'
  }

  /*get typeOptions(): Array<any>{
    return Object.entries(Entry.types).map(
      ([value, text]) => {
        return {
          text: text,
          value: value
        }
      }
    )
  }*/
  
  constructor(
    private toastr: ToastrService,
    private typeService:TypeService,
    private entryService: EntryService,
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,) { }

  ngAfterContentChecked(): void {
    this.setPageTitle()
  }
  setPageTitle() {
    if (this.currentAction == "new") {
      this.pageTitle = "Cadastro de Nova Lançamento"
    } else {
      const entryName = this.entry.name || ""
      this.pageTitle = "Editando Lançamento: " + this.entry.name
    }
  }

  ngOnInit(): void {
    this.setCurrentAction();
    this.setBuildEntryForm();         
    this.loadEntry();
    this.loadCategories();
    this.typesOptions();
  
  }

  protected setBuildEntryForm() {
    this.entryForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null],
      type: ['expense', [Validators.required]],
      amount: [null, [Validators.required]],
      date: [null, [Validators.required]],
      paid: [true, [Validators.required]],
      category_id: [null, [Validators.required]]
    });
  }

  private setCurrentAction() {
    if (this.route.snapshot.url[0].path == "new") {
      this.currentAction = "new"
    } else {
      this.currentAction = "edit"
    }
  }

  private loadEntry() {
    this.spinner.show()
    if (this.currentAction == "edit") {
      this.route.paramMap.pipe(
        switchMap(parameter => this.entryService.getById(+parameter.get("id")!))
      ).subscribe(
        (entry) => {
          this.spinner.hide()
          this.entry = entry;
          this.entryForm?.patchValue(entry)
        },
        (error) => {
          this.spinner.hide()
          alert("Ocorreu um erro no servidor, tente mais tarde")
        }
      )
    }
  }

  private createEntry() {

    const entry: Entry = Object.assign(new Entry(), this.entryForm.value)
    this.spinner.show()
    this.entryService.created(entry).subscribe(
      entry => {
      this.spinner.hide()
       this.actionsForSuccess(entry)},
     error =>{ 
       this.spinner.hide()
       this.actionsForError(error)}
    )
  }

  private updateEntry() {

    const entry: Entry = Object.assign(new Entry(), this.entryForm.value)
    this.spinner.show()
    this.entryService.update(entry).subscribe(
      entry => {
         this.spinner.hide()
        this.actionsForSuccess(entry)},
      error =>{ 
        this.spinner.hide()
        this.actionsForError(error)}
    )
  }

  private actionsForSuccess(entry: Entry) {
    this.toastr.success("Solicitação processada com sucesso!");

    // redirect/reload component page
    this.router.navigateByUrl("entries", { skipLocationChange: true }).then(
      () => this.router.navigate(['entries', entry.id, "edit"])
    )
  }

  private actionsForError(error: any) {
    this.toastr.error("Ocorreu um erro ao processar a sua solicitação!");

    this.submittingForm = false
    if (error.status === 422) {
      this.serverErrorMessages = JSON.parse(error._body).errord
    } else {
      this.serverErrorMessages = ["Falha na comunicação com o servidor. Por Favor, teste mais tarde."]
    }
  }

   submitForm(){
     this.submittingForm = true

     if(this.currentAction == "new"){
        this.createEntry();
     }else{
        this.updateEntry();
     }
  }
 private loadCategories(){
    this.categoryService.getAll().subscribe(
      categories => this.categories = categories
    )
  }

   typesOptions(){
    return this.types = this.typeService.getTypeOptions()
  }
}
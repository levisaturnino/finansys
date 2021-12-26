import { Component, OnInit } from '@angular/core';
import { Entry } from '../shared/entry.model';
import { EntryService } from '../shared/entry.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.css']
})
export class EntryListComponent implements OnInit {

  entries: Entry[] = []

  constructor(
    private entryService: EntryService,   
     private spinner: NgxSpinnerService,) { }

  ngOnInit(): void {
    this.spinner.show();
  this.entryService.getAll().subscribe(
      entries => 
      {
        this.spinner.hide();
        this.entries = entries.sort((a,b) => b?.id! - a?.id!)
      },
      error => 
      {
        this.spinner.hide();
        alert("Erro o carregar a lista")
      }
    )
  }

  deleteEntry(entry:Entry){

    const mustDelete = confirm('Deseja realmente excluir esse item?')
    if(mustDelete){
      this.spinner.show();
    this.entryService.delete(entry?.id!).subscribe(
    
      () =>
      {
        this.spinner.hide();
        this.entries = this.entries.filter(element => element != entry)
      },
        () =>
      {
        this.spinner.hide();
        alert("Erro ao tentar excluír")
      } 
    )
  }
}
}
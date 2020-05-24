import { Component, OnInit } from '@angular/core';
import { AlunosService } from './alunos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.css']
})
export class AlunosComponent implements OnInit {
  alunos: any[];
  constructor
  (
    private alunosService: AlunosService,
    private router: Router
  ){

  }

  onCancel(){

  }
  
  onInsert(){
    this.router.navigate(['/novoAluno']);
  }
  
  ngOnInit(): void {
    console.log("chamou o ngOnInit do alunos");
    this.alunosService.list().subscribe(val => this.alunos = val);
  }
}

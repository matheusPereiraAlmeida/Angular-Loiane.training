import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { AlunosService } from '../alunos.service';
import { Subscription } from 'rxjs';
import { AlertModalService } from 'src/app/shared/shared.services';

@Component({
  selector: 'app-aluno-form',
  templateUrl: './aluno-form.component.html',
  styleUrls: ['./aluno-form.component.css']
})
export class AlunoFormComponent implements OnInit {
  formulario: FormGroup; //representa o formulário 
  id: number ;
  inscricao: Subscription;
  alunos: any;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private alunosService: AlunosService,
    private modal: AlertModalService
    ) {}

  ngOnInit(): void {
    
    this.formulario = new FormGroup({
      nome: new FormControl(null),
      email: new FormControl(null)
    });

  }

  
  onSubmit(){
    this.alunos = this.formulario.value;
    this.alunosService.save(this.alunos).subscribe(
        
      (success) => {
        this.modal.showAlertSucess("Sucesso");
        this.router.navigate(['/alunos']);  
      },
      (error) => {
        this.modal.showAlertDanger("Falha");
      }
      
    );

  }

  onCancel(){
    console.log("Entrou aqui");
    this.router.navigate(['/alunos']);
  }

  resetar(){
    this.formulario.reset();
  }
}

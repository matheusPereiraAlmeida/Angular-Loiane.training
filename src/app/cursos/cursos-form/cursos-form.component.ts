import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CursosService } from '../cursos.service';
import { AlertModalService } from 'src/app/shared/shared.services';
import { environment } from 'src/environments/environment';
import { take } from 'rxjs/operators';
import { cursos } from '../cursos';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.css']
})
export class CursosFormComponent implements OnInit {
  formulario: FormGroup; //representa o formulário 

  id: number ;
  inscricao: Subscription;
  curso: any;
  
  constructor
  (
    private http: HttpClient,
    private router: Router,
    private cursoService: CursosService,
    private modal: AlertModalService,
    private _route: ActivatedRoute,   
    private cursosService: CursosService
  ) { }

  ngOnInit(): void {

    this.formulario = new FormGroup({
      nome: new FormControl(null),
    //  email: new FormControl(null)
    });
    
  }

  
  onSubmit(){
    this.curso = this.formulario.value;
    
    this.cursoService.save(this.curso).subscribe(
        
      (success) => {
        this.modal.showAlertSucess("Sucesso");
        this.router.navigate(['/cursos']);  
      },
      (error) => {
        this.modal.showAlertDanger("Falha");
      }
      
    );

  }

  onCancel(){
    console.log("Entrou aqui");
    this.router.navigate(['/cursos']);
  }
}

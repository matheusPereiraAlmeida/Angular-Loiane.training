import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CursosService } from '../cursos.service';

@Component({
  selector: 'app-curso-detalhe',
  templateUrl: './curso-detalhe.component.html',
  styleUrls: ['./curso-detalhe.component.css']
})
export class CursoDetalheComponent implements OnInit {
  id: number ;
  inscricao: Subscription;
  curso: any;

  constructor(
    private _route: ActivatedRoute,    
    private router: Router,
    private cursosService: CursosService
    ) {}

  ngOnInit() {  
    this.inscricao = this._route.params.subscribe(
      (params: any) =>{
        this.id = params['id'];
        this.curso = this.cursosService.loadByID(this.id).subscribe(dados=> this.curso = dados);
      }
    )
  }

  redirectTo(id){
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['novoCurso', id]);
  }
  
  onDelete(id){

    console.log(this.id);
    this.cursosService.delete(this.id).subscribe(
      (success) => {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['cursos']);
      },
      (error) => {}
    );
  }

  ngOnDestroy(){
    this.inscricao.unsubscribe();
  }

}

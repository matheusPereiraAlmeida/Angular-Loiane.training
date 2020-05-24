import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { ActivatedRoute, Router } from '@angular/router';
import { CursosService } from 'src/app/cursos/cursos.service';
import { AlunosComponent } from '../alunos.component';
import { AlunosService } from '../alunos.service';

@Component({
  selector: 'app-aluno-detalhe',
  templateUrl: './aluno-detalhe.component.html',
  styleUrls: ['./aluno-detalhe.component.css']
})
export class AlunoDetalheComponent implements OnInit {

  id: number ;
  inscricao: Subscription;
  alunos: any;
  constructor(
    private route: ActivatedRoute,    
    private router: Router,
    private alunosService: AlunosService
    ) {}

  ngOnInit() {    
    this.inscricao = this.route.params.subscribe(
      (params: any) =>{
        this.id = params['id'];
        this.alunos = this.alunosService.loadByID(this.id).subscribe(dados=> this.alunos = dados);
      }
    )
  }

  onDelete(id){

    console.log(this.id);
    this.alunosService.delete(this.id).subscribe(
      (success) => {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['alunos']);
      },
      (error) => {}
    );
  }
  
  ngOnDestroy(){
    this.inscricao.unsubscribe();
  }


}

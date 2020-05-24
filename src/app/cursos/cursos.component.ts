import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CursosService } from './cursos.service';
import { SubscriptionLike, Subscription } from 'rxjs';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {
  cursos: any[];
  pagina: number;
  inscricao: Subscription;

  constructor(
    private cursosService: CursosService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.inscricao = this.cursosService.list().subscribe(val => this.cursos = val);
  }

  onInsert(){
    console.log("Entrou aqui");
    this.router.navigate(['/novoCurso']);
  }
  

  ngOnDestroy(){
    this.inscricao.unsubscribe();
  }
}

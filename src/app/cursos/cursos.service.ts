import { Injectable } from '@angular/core';
import { CrudService } from '../shared/crud.service';
import { cursos } from './cursos';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CursosService extends CrudService<cursos>{
  /*
  getCursos(){
    return[
      {id: 1, nome: 'Angular 2'},
      {id: 2, nome: 'Java'}
    ]
  }

  getCurso(id: number){
    let cursos = this.getCursos();
    for(let i=0; i<cursos.length; i++){
      let curso = cursos[i];
      if(curso.id == id){
        return curso;
      }
    }
    return null;
  }
  */
 
  constructor(public http: HttpClient) {
    super(http, environment.API+'/cursos');
  }
}

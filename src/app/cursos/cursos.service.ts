import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { cursos } from './cursos';
import { delay, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CrudService } from '../shared/crud-service';

@Injectable({
  providedIn: 'root'
})
export class CursosService extends CrudService<cursos>{
  
  constructor(public http: HttpClient) {
    super(http, environment.API+'/cursos');
  }
  
  /*
  private readonly API = environment.API+'/cursos';

  constructor(private http: HttpClient) { }

  list(){
    return this.http.get<cursos[]>(this.API)
    .pipe(delay(2000));
  }

  loadByID(id){
    return this.http.get<cursos>(this.API+'/'+id).pipe(take(1));
  }

  private create(curso){
    return this.http.post(this.API, curso).pipe(take(1));
  }

  private update(curso){
    return this.http.put(this.API+'/'+curso.id, curso).pipe(take(1));
  }

  save(curso){
    console.log(curso.id);
    if(curso.id){
      return this.update(curso);
    }else{
      return this.create(curso);
    }
  }

  delete(id){
    return this.http.delete(this.API+'/'+id, id).pipe(take(1));
  }*/
}

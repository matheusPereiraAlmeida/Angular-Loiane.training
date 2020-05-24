import { Injectable } from '@angular/core';
import { CrudService } from '../shared/crud.service';
import { alunos } from './alunos';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlunosService extends CrudService<alunos>{
 
  constructor(public http: HttpClient) {
    super(http, environment.API+'/alunos');
  }
}

import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Resolve,
} from '@angular/router';
import { Observable } from 'rxjs';
import { cursos } from '../cursos';
import { CursosService } from '../cursos.service';

@Injectable({
  providedIn: 'root',
})
export class CursoResolverGuard implements Resolve<cursos> {
  constructor(private service: CursosService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): cursos | Observable<cursos> | Promise<cursos> {
    if (route.params && route.params['id']) {
      return this.service.loadByID(route.params['id']);
    }

    return {
      id: null,
      nome: null,
    };
  }
}

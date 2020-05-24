import { Component, OnInit, ViewChild } from '@angular/core';
import { cursos } from '../cursos';
import { CursosService } from '../cursos.service';
import { Observable, empty, Subject } from 'rxjs';
import { catchError, take, switchMap } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from 'src/app/shared/alert-modal/alert-modal.component';
import { AlertModalService } from 'src/app/alert-modal.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.css'],
})
export class CursosListaComponent implements OnInit {
  //delete variables
  deleteModalRef: BsModalRef;
  @ViewChild('deleteModal') deleteModal;
  cursoSelecionado: cursos;

  cursos$: Observable<cursos[]>;
  error$ = new Subject<boolean>();

  constructor(
    private service: CursosService,
    private alertService: AlertModalService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    //  this.service.list().subscribe(dados => this.cursos = dados);
    this.onRefresh();
  }

  onRefresh() {
    //inscrição async
    this.cursos$ = this.service.list().pipe(
      //pipe que captura o erro quando ñ conecta no servidor
      catchError((error) => {
        console.error(error);
        //this.error$.next(true);
        this.handleError();
        return empty();
      })
    );
  }

  handleError() {
    this.alertService.showAlertDanger(
      'Erro ao carregar cursos. Tente novamente mais tarde.'
    );
  }

  onEdit(id) {
    this.router.navigate(['editar', id], { relativeTo: this.route });
  }

  onDelete(curso) {
    this.cursoSelecionado = curso;
    //this.deleteModalRef = this.modalService.show(this.deleteModal, {class: 'modal-sm',});
    const result$ = this.alertService.showConfirm('Confirmação','Tem certeza que deseja remover esse curso?');
    result$.asObservable().pipe(
      take(1),
      switchMap(
        result => result ?  this.service.delete(curso.id) : empty())
    ). subscribe(
      (success) => {
      this.onRefresh();
    },
    (error) => {
      this.alertService.showAlertDanger(
        'Erro ao remover curso, tente novamente mais tarde.'
      );
    })
  }

  onConfirmDelete() {
    console.log(this.cursoSelecionado.id);
    this.service.delete(this.cursoSelecionado.id).subscribe(
      (success) => {
        this.onRefresh();
        this.deleteModalRef.hide();
      },
      (error) => {
        this.alertService.showAlertDanger(
          'Erro ao remover curso, tente novamente mais tarde.'
        );
        this.deleteModalRef.hide();
      }
    );
  }
  onDeclineDelete() {
    this.deleteModalRef.hide();
  }
}

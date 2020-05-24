import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CursosService } from '../cursos.service';
import { AlertModalService } from 'src/app/alert-modal.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { stringify } from 'querystring';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.css'],
})
export class CursosFormComponent implements OnInit {
  form: FormGroup;
  submitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private service: CursosService,
    private modal: AlertModalService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    //pega o id do curso
    /*
    this.route.params.subscribe((params: any) => {
      const id = params['id'];
      const curso$ = this.service.loadByID(id);
      
      curso$.subscribe(curso => {
        this.updateForm(curso);
      });
    });
    
   this.route.params.pipe(
     map((params:any) => params['id']),
     switchMap(id => this.service.loadByID(id)),
   ).subscribe(curso => this.updateForm(curso));
   */
    const curso = this.route.snapshot.data['curso'];

    this.form = this.fb.group({
      id: [curso.id],
      Nome: [
        curso.Nome,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(250),
        ],
      ],
    });
  }

  updateForm(curso) {
    this.form.patchValue({
      id: curso.id,
      Nome: curso.Nome,
    });
  }
  onSubmit() {
    let msg: string = '';
    this.submitted = true;
    console.log(this.form.value);

    if (this.form.value.id) {
      msg = 'Update feito com sucesso';
    } else {
      msg = 'criação feita com sucesso';
    }

    if (this.form.valid) {
      this.service.save(this.form.value).subscribe(
        (success) => {
          this.modal.showAlertSucess(msg);
          this.location.back();
        },
        (error) => {
          this.modal.showAlertDanger(msg);
        }
      );

      /*

        this.service.update(this.form.value).subscribe( 
          (success) => {
          this.modal.showAlertSucess('Update feito com sucesso');
          this.location.back();
        },
        (error) => this.modal.showAlertDanger('Erro ao fazer update'),
        () => console.log('update completo')
      );
        //update
      }else{
        this.service.create(this.form.value).subscribe(
          (success) => {
            this.modal.showAlertSucess('Criado com sucesso');
            this.location.back();
          },
          (error) => this.modal.showAlertDanger('Erro ao inserir'),
          () => console.log('request completo')
        );
      */
    }
    console.log('submit');
  }

  onCancel() {
    this.submitted = false;
    this.form.reset;
    console.log('onCancel');
  }

  hasError(field: string) {
    return this.form.get(field).errors;
  }
}

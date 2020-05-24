import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {CursosService} from './cursos/cursos.service';
import { AppComponent } from './app.component';
import { CursosComponent } from './cursos/cursos.component';
import { LoginComponent } from './login/login.component';
import { routing } from './app.routing';
import { CursoDetalheComponent } from './cursos/curso-detalhe/curso-detalhe.component';
import { AlunosComponent } from './alunos/alunos.component';
import { AuthGuard } from './guard/auth.guard';
import { AuthService } from './login/auth.service';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';
import { TemplateFormComponent } from './template-form/template-form.component';
import { DataFormComponent } from './data-form/data-form.component';
import { HttpClientModule } from '@angular/common/http';
import { AlunoFormComponent } from './alunos/aluno-form/aluno-form.component';
import { CursosFormComponent } from './cursos/cursos-form/cursos-form.component';
import { ModalModule, BsModalRef } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    AppComponent,
    CursosComponent,
    LoginComponent,
    CursoDetalheComponent,
    AlunosComponent,
    PaginaNaoEncontradaComponent,
    TemplateFormComponent,
    DataFormComponent,
    AlunoFormComponent,
    CursosFormComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule, // necessário para o data driven form 
    HttpClientModule,
    ModalModule.forRoot(),
    routing
  ],
  providers: [CursosService, AuthService, AuthGuard, BsModalRef],
  bootstrap: [AppComponent]
})
export class AppModule { }

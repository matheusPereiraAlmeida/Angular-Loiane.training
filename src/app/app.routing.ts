import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";

import { CursosComponent } from './cursos/cursos.component';
import { LoginComponent } from './login/login.component';
import { CursoDetalheComponent } from './cursos/curso-detalhe/curso-detalhe.component';
import { AlunosComponent } from './alunos/alunos.component';
import { AlunoDetalheComponent } from './alunos/aluno-detalhe/aluno-detalhe.component';
import { AppComponent } from './app.component';
import { AuthGuard } from './guard/auth.guard';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';
import { TemplateFormComponent } from './template-form/template-form.component';
import { DataFormComponent } from './data-form/data-form.component';
import { AlunoFormComponent } from './alunos/aluno-form/aluno-form.component';
import { CursosFormComponent } from './cursos/cursos-form/cursos-form.component';

const APP_ROUTES: Routes = [    
    { path: 'login', component: LoginComponent },
    { path: 'templateForm', component: TemplateFormComponent, canActivate:[AuthGuard] },
    { path: 'dataForm', component: DataFormComponent, canActivate:[AuthGuard] },
    { path: 'novoAluno', component: AlunoFormComponent, canActivate:[AuthGuard] },
    
    { path: 'novoCurso', component: CursosFormComponent, canActivate:[AuthGuard], children: [
        {path: ':id', component: CursosFormComponent, canActivate:[AuthGuard]}
    ]},
    
    { path: 'novoAluno', component: CursosFormComponent, canActivate:[AuthGuard], children: [
        {path: ':id', component: CursosFormComponent, canActivate:[AuthGuard]}
    ]},

    //rotas filhas
    {path: 'alunos', component: AlunosComponent, canActivate:[AuthGuard], children: [
        {path: ':id', component: AlunoDetalheComponent, canActivate:[AuthGuard]}
    ]},
    { path: 'cursos', component: CursosComponent, canActivate:[AuthGuard], children: [
        { path: ':id', component: CursoDetalheComponent, canActivate:[AuthGuard] },
    ] },
    { path: '', component: AppComponent, canActivate:[AuthGuard] },
    { path: '**', component: PaginaNaoEncontradaComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);
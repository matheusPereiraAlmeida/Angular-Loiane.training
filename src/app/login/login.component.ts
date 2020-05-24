import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Usuario } from './usuario';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: Usuario = new Usuario();

  constructor(private autService: AuthService,
    ) { }

  ngOnInit(): void {
  }

  fazerLogin(){
    this.autService.fazerLogin(this.usuario);
  }
  
}

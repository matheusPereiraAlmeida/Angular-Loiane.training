import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})

export class TemplateFormComponent implements OnInit {
  usuario: any = {
    nome: 'Matheus',
    email: 'matheus@gmail.com'
  }
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  onSubmit(form){
    console.log(form);
    console.log(this.usuario);
    
    this.http.post('https://httpbin.org/post', JSON.stringify(form.value)).subscribe(dados => console.log(dados));
  }
  consultaCEP(cep, form){
     //Nova variável "cep" somente com dígitos.
    var cep = cep.replace(/\D/g, '');

     //Verifica se campo cep possui valor informado.
     if (cep != "") {
       
     //Expressão regular para validar o CEP.
     var validacep = /^[0-9]{8}$/;

     //Valida o formato do CEP.
     if(validacep.test(cep)) {
       this.http.get("https://viacep.com.br/ws/"+ cep +"/json").subscribe(dados => this.populaDadosForm(dados, form));
     }
  }
}

  populaDadosForm(dados, form){
    /*form.setValue({
      nome: form.value.nome,
      email: form.value.email,

        endereco:{ 
          rua: dados.logradouro,
        cep: dados.cep,
        numero: '',
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf,
        }
    });*/

    form.form.patchValue({
      endereco:{ 
        rua: dados.logradouro,
        cep: dados.cep,
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    })
  }
}
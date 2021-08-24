/* tslint:disable:no-redundant-jsdoc callable-types */
/* tslint:disable:variable-name */
import { Router } from '@angular/router';
import { AutenticacaoService } from './autenticacao.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/security/User';
import {NgForm} from '@angular/forms';
import {SecurityService} from '../../shared/security/security.service';
import {MessageService} from '../../shared/message/message.service';

@Component({
  selector: 'app-autentication',
  templateUrl: './autenticacao.component.html',
  styleUrls: ['./autenticacao.component.scss']
})
export class AutenticacaoComponent implements OnInit {

  public usuarioTO: any;
  public submitted: boolean;

  /**
   * Construtor da classe.
   *
   * @param securityService
   * @param autenticationService
   * @param messageService
   * @param router
   */
  constructor(
    private securityService: SecurityService,
    private autenticationService: AutenticacaoService,
    private messageService: MessageService,
    private router: Router) { }

  /**
   * Inicializa as dependências do componente.
   */
  ngOnInit(): void {
    this.usuarioTO = {};
  }

  /**
   * Autentica o Usuário na aplicação conforme os parâmetros informados.
   *
   * @param usuarioTO
   * @param form
   */
  public onSubmit(usuarioTO: any, form: NgForm): void {
    this.submitted = true;
    if (form.valid) {
      this.autenticationService.login(usuarioTO).subscribe(data => {
        const user: User = {
          id: data.id,
          name: data.nome,
          login: data.login,
          expiresIn: data.expiresIn,
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
          roles: data.roles
        };

        this.securityService.init(user);
        this.router.navigate(['administracao']);
      }, error => {
          this.messageService.addMsgDanger(error);
        // }
      });
    }
  }

}

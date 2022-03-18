import { Component } from '@angular/core';
import {MessageService} from '../../../shared/message/message.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AutenticacaoService } from '../autenticacao.service';
import {SecurityService} from '../../../shared/security/security.service';


/**
 * Componente responsável pela Redefinição de Senha
 * @author Guiliano Rangel (UEG)
 */
@Component({
  selector: 'form-alterar-senha',
  templateUrl: './form-alterar-senha.component.html'
})
export class FormAlterarSenhaComponent {

  public redefinirSenhaTO: any;
  public submitted: boolean;

  /**
   * Construtor da classe.
   *
   * @param messageService -
   * @param authService -
   * @param securityService -
   * @param router -
   */
  constructor(
    private authService: AutenticacaoService,
    private messageService: MessageService,
    private securityService: SecurityService,
    route: ActivatedRoute,
    private router: Router) {
    const token = route.snapshot.params['token'];
    this.redefinirSenhaTO = { token };
  }


  /**
   * Salva a redefinição de senha do Usuario.
   *
   * @param redefinirSenhaTO
   * @param form
   */
  public onSubmit(redefinirSenhaTO: any, form: NgForm): void {
    this.submitted = true;

    if (form.valid) {
      this.authService.redefinirSenha(redefinirSenhaTO).subscribe(data => {
        this.securityService.init({
          id: data.id,
          name: data.nome,
          login: data.login,
          expiresIn: data.expiresIn,
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
          roles: data.roles
        });
        this.messageService.addMsgSuccess('MSG007');
        this.router.navigate(['administracao']);
      }, error => {
        this.messageService.addMsgDanger(error);
      });
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AutenticacaoService } from '../autenticacao.service';
import {MessageService} from '../../../shared/message/message.service';

/**
 * Componente responsável pela recuperação de Senha.
 *
 * @author Guiliano Rangel (UEG)
 */
@Component({
  selector: 'form-recuperar-senha',
  templateUrl: './form-recuperar-senha.component.html',
})
export class FormRecuperarSenhaComponent implements OnInit {

  public data: any;
  public submitted: boolean;

  /**
   * Construtor da classe.
   *
   * @param authService -
   * @param messageService -
   * @param router -
   */
  constructor(private authService: AutenticacaoService, private messageService: MessageService, private router: Router) { }

  /**
   * Inicializa as dependências do Component.
   */
  ngOnInit(): void {
    this.data = {};
  }

  /**
   * Realiza a solicitação de recuperação de senha.
   *
   * @param cpfCnpj -
   * @param form -
   */
  public onSubmit(cpfCnpj: any, form: NgForm): void {
    this.submitted = true;

    if (form.valid) {
      this.authService.solicitarAlteracaoSenha(cpfCnpj).subscribe(data => {
        this.messageService.addMsgInf('MSG048', data.email);
        this.router.navigate(['/']);
      }, error => {
        this.messageService.addMsgDanger(error);
      });
    }
  }

  /**
   * Modal de confirmação de Cancelar Operação.
   */
  public cancelar() {
    this.messageService.addConfirmYesNo('MSG049', () => {
      this.router.navigate(['/']);
    });
  }

}

/* tslint:disable:component-selector no-redundant-jsdoc */
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import {MessageService} from '../../shared/message/message.service';
import {SecurityService} from '../../shared/security/security.service';


/**
 * Implementação do component 'Admin' responsável por prover o template padrão da aplicação.
 *
 * @author Guiliano Rangel (UEG)
 */
@Component({
  selector: 'administracao',
  templateUrl: './administracao.component.html'
})
export class AdministracaoComponent {

  /**
   * Construtor da classe.
   *
   * @param messageService
   * @param securityService
   * @param router
   */
  constructor(
    private router: Router,
    private messageService: MessageService,
    public securityService: SecurityService,
  ) { }


  /**
   * Verifica se o Usuário está autenticado através de sua Credencial.
   *
   * @returns boolean
   */
  public isAutenticado(): boolean {
    return this.securityService.isValid();
  }



}

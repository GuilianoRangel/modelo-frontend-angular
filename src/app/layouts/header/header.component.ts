/* tslint:disable:no-redundant-jsdoc no-shadowed-variable */
import {Component, Inject, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { SecurityService } from 'src/app/shared/security/security.service';
import { MessageService } from 'src/app/shared/message/message.service';
import {config, IConfig} from '../../shared/security/config';
import {AbstractComponent} from '../../shared/component/Abstract.component';

/**
 * Componente header.
 *
 * @author Guiliano Rangel (UEG)
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent extends AbstractComponent implements OnInit {

  public idPerfil: number;

  /**
   * Construtor da componente.
   *
   * @param route
   * @param router
   * @param securityService
   * @param dialog
   * @param messageService
   * @param config
   */
  constructor(
    route: ActivatedRoute,
    private router: Router,
    public securityService: SecurityService,
    public dialog: MatDialog,
    public messageService: MessageService,
    @Inject(config) private config: IConfig) {
    super();
  }

  /**
   * Inicializa as dependências do Component.
   */
  ngOnInit(): void {
   /* if (!this.perfis || this.perfis.length === 0) {
      this.securityService.invalidate();
    }

    if (this.securityService.isValid()) {
      this.idPerfil = this.securityService.credential.user.idPerfil;
    } else {
      this.open();
    }*/
  }

  /**
   * Sai da aplicação conforme conformiação do Usuário.
   */
  public sair(): void {
    this.messageService.addConfirmYesNo('MSG_DESEJA_SAIR_SISTEMA', () => {
      // TODO Verificar rota final
      this.router.navigateByUrl(this.config.loginRouter);
      this.securityService.invalidate();
    });
  }

  /**
   * Retorna o nome do Usuário logado na aplicação.
   *
   * @returns string
   */
  public get nomeUsuario(): string {
    return this.securityService.credential.userName;
  }

  /**
   * Verifica se o Usuário está autenticado através de sua Credencial.
   *
   * @returns boolean
   */
  public isAutenticado(): boolean {
    return this.securityService.isValid();
  }
}

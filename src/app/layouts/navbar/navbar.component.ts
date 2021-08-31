/* tslint:disable:no-redundant-jsdoc no-shadowed-variable */
import {Component, Output, EventEmitter, Inject} from '@angular/core';
import { SecurityService } from 'src/app/shared/security/security.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {MessageService} from '../../shared/message/message.service';
import {config, IConfig} from '../../shared/security/config';
import {AbstractComponent} from '../../shared/component/Abstract.component';

/**
 * Componente Navbar
 *
 * @author Guiliano Rangel (UEG)
 */
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent extends AbstractComponent {

  public isAdministracao = false;

  @Output() logout: EventEmitter<any>;
  @Output() perfil: EventEmitter<any>;

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
    this.logout = new EventEmitter<any>();
    this.perfil = new EventEmitter<any>();


    if (router.routerState.snapshot.url.startsWith('/administracao')) {
      this.isAdministracao = true;
    }
  }

  /**
   * Retorna o nome do Usuário logado na aplicação.
   *
   * @returns string
   */
  public get nomeUsuario(): string {
    return this.securityService.credential.login + ' - ' + this.securityService.credential.userName;
  }

  /**
   * Sai da aplicação conforme conformiação do Usuário.
   */
  public sair(): void {
    // this.logout.emit();
  }
}

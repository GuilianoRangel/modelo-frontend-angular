/* tslint:disable:no-shadowed-variable no-redundant-jsdoc */
import {Component, AfterViewInit, ViewChild, Inject} from '@angular/core';
import { HeaderComponent } from './header/header.component';
import {SecurityService} from '../shared/security/security.service';
import {MessageService} from '../shared/message/message.service';
import {config, IConfig} from '../shared/security/config';
import {AbstractComponent} from '../shared/component/Abstract.component';


/**
 * Componente Layout.
 *
 * @author Guiliano Rangel (UEG)
 */
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent extends AbstractComponent implements AfterViewInit {

  @ViewChild('header', { static: true }) header: HeaderComponent;
  /**
   * Construtor da componente.
   *
   * @param securityService
   * @param messageService
   * @param config
   */
  constructor(
    public securityService: SecurityService,
    public messageService: MessageService,
    @Inject(config) private config: IConfig) {
    super();
  }
  /**
   * Init dependency after view.
   */
  ngAfterViewInit(): void {
  }

  /**
   * Abre o dialog de seleção de perfis.
   */
  public openPerfilModal(): void {
    // TODO tratar depois
    // this.header.open();
  }

  /**
   * Sai da aplicação conforme conformiação do Usuário.
   */
  public sair(): void {
    this.header.sair();
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

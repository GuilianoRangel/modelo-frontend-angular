/* tslint:disable:no-redundant-jsdoc */
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {AutenticacaoService} from '../autenticacao/autenticacao.service';
import {MessageService} from '../../shared/message/message.service';
import {SecurityService} from '../../shared/security/security.service';
import {User} from '../../shared/security/User';
import {MNEMONICO_PORTAL} from '../../shared/app.constantes';


/**
 * Componente responsável pela listagem do 'Painel de Sistemas'.
 *
 * @author Guiliano Rangel (UEG)
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  public sistemas: any[];
  public filtro: any;
  public grupos: any[];

  /**
   * Construtor da classe.
   *
   * @param route
   * @param router
   * @param authService
   * @param messageService
   * @param securityService
   */
  constructor(
    route: ActivatedRoute,
    private router: Router,
    private authService: AutenticacaoService,
    private messageService: MessageService,
    private securityService: SecurityService
  ) {
    this.filtro = {};
    this.sistemas = route.snapshot.data.sistemas;
    this.grupos = route.snapshot.data.grupos;
  }

  /**
   * Filtra a lista de Sistemas retornando apenas o Portal.
   */
  public datasourceAdministrador(): any[] {
    return this.sistemas.filter((sistema: any) => {
      let isAdmin = false;
      const grupoSistema = this.grupos.filter((grupo: any) =>  grupo.idSistema === sistema.id);
      if (grupoSistema !== undefined) {
        isAdmin = grupoSistema.filter((grupo2: any) => grupo2.administrador === true).length > 0;
      }
      return isAdmin && sistema.mnemonico === MNEMONICO_PORTAL;
    });
  }

  /**
   * Filtra a lista de Sistemas retornando todos os Sistemas menos o Portal.
   */
  public datasourceTodos(): any[] {
    return this.sistemas.filter((sistema: any) => {
      return sistema.mnemonico !== MNEMONICO_PORTAL;
    });
  }


  /**
   * Verifica se o Usuário tem Permissão de Acesso ao Sistema e abre o Sistema em uma nova aba/guia.
   *
   * @param sistema
   */
  public acessarSistema(sistema: any): void {
    this.authService.validarPermissaoUsuario(sistema.mnemonico).subscribe(() => {
      window.open(`${sistema.url.trim()}${this.securityService.credential.refreshToken}`, '_blank');
    }, error => {
      this.messageService.addMsgDanger(error);
    });
  }

  /**
   * Recupera as 'ROLES' do Usuário e redireciona para a área de administração do 'Portal'.
   */
  public acessarAdministracao(): void {
    this.authService.refresh(this.securityService.credential.user.refreshToken, MNEMONICO_PORTAL).subscribe(data => {
      const user: User = {
        id: data.id,
        name: data.nome,
        login: data.login,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        expiresIn: data.expiresIn,
        roles: data.roles,
        mnemonico: MNEMONICO_PORTAL
      };
      this.securityService.init(user);
      this.router.navigate(['/administracao']);
    }, error => {
      this.messageService.addMsgDanger(error);
    });
  }
}

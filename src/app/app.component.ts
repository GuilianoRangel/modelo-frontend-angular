/* tslint:disable:no-redundant-jsdoc callable-types object-literal-shorthand no-shadowed-variable */
/* tslint:disable:variable-name */
import { Router } from '@angular/router';
import {Component, Inject, OnInit} from '@angular/core';
import {MessageItem, MessageService} from './shared/message/message.service';
import {SecurityService} from './shared/security/security.service';
import {User} from './shared/security/User';
import {AutenticacaoService} from './pages/autenticacao/autenticacao.service';
import {LoaderDialogComponent} from './layouts/loader-dialog/loader-dialog.component';
import {LoaderService} from './shared/loader/loader.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ConfirmDialogComponent} from './shared/message/confirm-mesage/confirm-dialog.component';
import {config, IConfig} from './shared/security/config';


/**
 * Componente principal da aplicação.
 *
 * @author Guiliano Rangel (UEG)
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  private dialogRef: MatDialogRef<any>;

  /**
   * Construtor da classe.
   *
   * @param loaderService
   * @param autenticationService
   * @param messageService
   * @param securityService
   * @param router
   * @param dialog
   * @param config
   */
  public constructor(
    private loaderService: LoaderService,
    private autenticationService: AutenticacaoService,
    private messageService: MessageService,
    private securityService: SecurityService,
    private router: Router,
    private dialog: MatDialog,
    @Inject(config) private config: IConfig) { }

  /**
   * Inicializa as dependências do componente.
   */
  ngOnInit(): void {
    this.securityService.onRefresh.subscribe((refreshToken: string) => {
      const mnemonico = this.securityService.credential.user.mnemonico;

      this.autenticationService.refresh(refreshToken, mnemonico).subscribe(data => {
        const user: User = {
          id: data.id,
          name: data.nome,
          login: data.login,
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
          expiresIn: data.expiresIn,
          roles: data.roles,
          mnemonico: mnemonico
        };
        this.securityService.init(user);
      }, error => {
        this.messageService.addMsgDanger(error);
      });
    });

    this.securityService.onForbidden.subscribe(() => {
      this.messageService.addMsgDanger('MSG044');
      this.router.navigate([this.config.loginRouter]);
    });

    this.securityService.onUnauthorized.subscribe(() => {
      this.router.navigate([this.config.loginRouter]);
      this.securityService.invalidate();
    });
    this.securityService.init();

    this.loaderService.onStart.subscribe(() => {
      this.dialogRef = this.dialog.open(LoaderDialogComponent, {
        minWidth: '50px',
        minHeight: '50px',
        hasBackdrop: true,
        disableClose: true
      });
    });

    this.loaderService.onStop.subscribe(() => {
      if (this.dialogRef !== undefined) {
        this.dialogRef.close();
      }
    });

    this.messageService.getMsgEmitter().subscribe((item: MessageItem) => this.addMsgItem(item));
    this.messageService.getConfirmEmitter().subscribe((item: MessageItem) => this.addConfirmItem(item));
  }
  /**
   * Adiciona o item de mensagem a visualização.
   *
   * @param item
   */
  private addMsgItem(item: MessageItem): void {
    this.messageService.addConfirmOk(item.msg);
  }

  /**
   * Adiciona o modal de confirmação a view.
   *
   * @param item
   */
  private addConfirmItem(item: MessageItem): void {
    this.dialog.open(ConfirmDialogComponent, {
      minWidth: '30%',
      minHeight: '30%',
      disableClose: true,
      data: {item}
    });
  }
}

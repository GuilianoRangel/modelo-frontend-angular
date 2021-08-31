/* tslint:disable:no-redundant-jsdoc */
import {NgForm} from '@angular/forms';
import {Component, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MessageService} from '../../../shared/message/message.service';
import {AcaoSistema} from '../../../shared/component/acao-sistema.acao';
import {SecurityService} from '../../../shared/security/security.service';
import {TipoAmigoClientService} from '../shared/tipo-amigo-client/tipo-amigo-client.service';

/**
 * Componente de formulário de Usuário.
 *
 * @author Guiliano Rangel (UEG)
 */
@Component({
  selector: 'app-usuario-form',
  templateUrl: './tipo-amigo-form.component.html',
  styleUrls: ['./tipo-amigo-form.component.scss']
})
export class TipoAmigoFormComponent {

  public acaoSistema: AcaoSistema;

  public tipoAmigo: any;
  public submitted: boolean;

  private dialogRef: MatDialogRef<any>;

  @ViewChild('formTipoAmigo', { static: true }) formTipoAmigo: NgForm;

  /**
   * Construtor da classe.
   *
   * @param route
   * @param router
   * @param dialog
   * @param messageService
   * @param securityService
   * @param tipoAmigoClientService
   */
  constructor(
    route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private messageService: MessageService,
    public securityService: SecurityService,
    private tipoAmigoClientService: TipoAmigoClientService
  ) {
    this.acaoSistema = new AcaoSistema(route);

    if (this.acaoSistema.isAcaoIncluir()) {
      this.tipoAmigo = {};
    }

    if (this.acaoSistema.isAcaoAlterar() || this.acaoSistema.isAcaoVisualizar()) {
      this.tipoAmigo = route.snapshot.data.tipoAmigo;
    }
  }

  /**
   * Salva a instância de Usuário.
   *
   * @param tipoAmigo
   * @param form
   * @param event
   */
  public salvar(tipoAmigo: any, form: NgForm, event: any) {
    form.onSubmit(event);
    this.submitted = true;

    if (form.valid) {
      this.tipoAmigoClientService.salvar(tipoAmigo).subscribe(() => {
        this.router.navigate(['/administracao/tipo-amigo']);
        this.messageService.addMsgSuccess('MSG007');
      }, error => {
        this.messageService.addMsgDanger(error);
      });
    } else {
      this.messageService.addMsgSuccess('MSG001');
    }
  }

  /**
   * Remover o Tipo de Amigo informado.
   *
   * @param tipoAmigo
   */
  private remover(tipoAmigo: any): void {
    this.messageService.addConfirmYesNo('MSG045', () => {
      this.tipoAmigoClientService.remover(tipoAmigo).subscribe(() => {
        this.router.navigate(['/administracao/tipo-amigo']);
        this.messageService.addMsgSuccess('MSG007');
      }, error => {
        tipoAmigo.status = true;
        this.messageService.addMsgDanger(error);
      });
    }, () => {
      tipoAmigo.status = true;
    });
  }

  /**
   * Confirma o cancelamento e volta para a tela de Pesquisa.
   */
  public cancelar(): void {
    let confirmed = false;

    if (this.acaoSistema.isAcaoVisualizar()) {
      this.router.navigateByUrl('/administracao/tipo-amigo');
      confirmed = true;
    }

    if ( !confirmed ) {
      this.messageService.addConfirmYesNo('MSG010', () => {
        this.router.navigateByUrl('/administracao/tipo-amigo');
      });
    }
  }

  /**
   * Fecar o Modal de Vinculação de Usuário do AD.
   */
  public closeDialogs(): void {
    this.dialogRef.close();
  }
}

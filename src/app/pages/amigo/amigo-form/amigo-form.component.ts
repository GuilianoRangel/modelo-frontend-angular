/* tslint:disable:no-redundant-jsdoc */
import {NgForm} from '@angular/forms';
import {Component, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {MessageService} from '../../../shared/message/message.service';
import {AcaoSistema} from '../../../shared/component/acao-sistema.acao';
import {SecurityService} from '../../../shared/security/security.service';
import {AmigoClientService} from '../shared/amigo-client/amigo-client.service';

/**
 * Componente de formulário de Amigo.
 *
 * @author Guiliano Rangel (UEG)
 */
@Component({
  selector: 'app-amigo-form',
  templateUrl: './amigo-form.component.html',
  styleUrls: ['./amigo-form.component.scss']
})
export class AmigoFormComponent {

  public acaoSistema: AcaoSistema;

  public amigo: any;
  public tipoAmigos: any[];
  public submittedAmigo: boolean;

  public dataSourceGrupos: MatTableDataSource<any>;

  public displayedColumns: any;

  @ViewChild('formAmigo', { static: true }) formAmigo: NgForm;

  /**
   * Construtor da classe.
   *
   * @param route
   * @param router
   * @param dialog
   * @param messageService
   * @param securityService
   * @param amigoClientService
   */
  constructor(
    route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private messageService: MessageService,
    public securityService: SecurityService,
    private amigoClientService: AmigoClientService
  ) {
    this.acaoSistema = new AcaoSistema(route);
    this.dataSourceGrupos = new MatTableDataSource<any>();

    this.tipoAmigos = route.snapshot.data.tipoAmigos;


    if (this.acaoSistema.isAcaoIncluir()) {

      // Inicializa o Amigo para Inclusão
      this.amigo = {
      };
    }


    if (this.acaoSistema.isAcaoAlterar() || this.acaoSistema.isAcaoVisualizar()) {
      this.amigo = route.snapshot.data.amigo;
    }
  }


  /**
   * Salva a instância de Amigo.
   *
   * @param amigo
   * @param form
   * @param event
   */
  public salvar(amigo: any, form: NgForm, event: any) {
    form.onSubmit(event);
    this.submittedAmigo = true;

    if (form.valid) {
      this.amigoClientService.salvar(amigo).subscribe(() => {
          this.router.navigate(['/administracao/amigo']);
          this.messageService.addMsgSuccess('MSG007');
        }, error => {
          this.messageService.addMsgDanger(error);
        });
    }
  }

  /**
   * Altera o status do Amigo informado.
   *
   * @param amigo
   */
  public alterarStatusAmigo(amigo: any): void {
    if (amigo.amigo) {
      this.tornarAmigo(amigo);
    } else {
      this.deixarAmigo(amigo);
    }
  }

  /**
   * Torna o cadastro um Amigo.
   *
   * @param amigo
   */
  private tornarAmigo(amigo: any): void {
    this.messageService.addConfirmYesNo('MSG046', () => {
      this.amigoClientService.tornarAmigo(amigo.id).subscribe(() => {
        this.messageService.addMsgSuccess('MSG007');
      }, error => {
        amigo.status = false;
        this.messageService.addMsgDanger(error);
      });
    }, () => {
      amigo.status = false;
    });
  }

  /**
   * deixar de ser amigo do cadastro
   *
   * @param amigo
   */
  private deixarAmigo(amigo: any): void {
    this.messageService.addConfirmYesNo('MSG047', () => {
      this.amigoClientService.deixarAmizade(amigo.id).subscribe(() => {
        this.messageService.addMsgSuccess('MSG007');
      }, error => {
        amigo.status = true;
        this.messageService.addMsgDanger(error);
      });
    }, () => {
      amigo.status = true;
    });
  }

  /**
   * Confirma o cancelamento e volta para a tela de Pesquisa.
   */
  public cancelar(): void {
    let confirmed = false;

    if (this.acaoSistema.isAcaoVisualizar()) {
      this.router.navigateByUrl('/administracao/amigo');
      confirmed = true;
    }

    if ( !confirmed ) {
      this.messageService.addConfirmYesNo('MSG010', () => {
        this.router.navigateByUrl('/administracao/amigo');
      });
    }
  }

}

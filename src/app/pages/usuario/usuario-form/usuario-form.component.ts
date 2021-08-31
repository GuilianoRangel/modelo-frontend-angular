/* tslint:disable:no-redundant-jsdoc */
import { NgForm } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { TipoUsuario } from 'src/app/shared/app.constantes';
import { MessageService } from '../../../shared/message/message.service';
import { AcaoSistema } from '../../../shared/component/acao-sistema.acao';
import { SecurityService } from '../../../shared/security/security.service';
import { UsuarioClientService } from '../shared/usuario-client/usuario-client.service';
import { GrupoClientService } from '../../grupo/shared/grupo-client/grupo-client.service';

/**
 * Componente de formulário de Usuário.
 *
 * @author Guiliano Rangel (UEG)
 */
@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.scss']
})
export class UsuarioFormComponent {

  public acaoSistema: AcaoSistema;

  public usuario: any;
  public telefonesUsuario: any[];
  public grupoInclusao: any;
  public gruposVinculados: any[];
  public grupos: any[];
  public submittedUsuario: boolean;
  public submittedGrupo: boolean;

  private dialogRef: MatDialogRef<any>;

  public dataSourceGrupos: MatTableDataSource<any>;

  public displayedColumns: any;

  @ViewChild('formUsuario', { static: true }) formUsuario: NgForm;
  @ViewChild('formGrupo', { static: true }) formGrupo: NgForm;

  /**
   * Construtor da classe.
   *
   * @param route
   * @param router
   * @param dialog
   * @param messageService
   * @param securityService
   * @param grupoClientService
   * @param usuarioClientService
   */
  constructor(
    route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private messageService: MessageService,
    public securityService: SecurityService,
    private grupoClientService: GrupoClientService,
    private usuarioClientService: UsuarioClientService
  ) {
    this.acaoSistema = new AcaoSistema(route);
    this.dataSourceGrupos = new MatTableDataSource<any>();

    if (this.acaoSistema.isAcaoVisualizar()) {
      this.displayedColumns = ['nomeGrupoVinculado'];
    } else {
      this.displayedColumns = ['nomeGrupoVinculado', 'remover'];
    }

    if (this.acaoSistema.isAcaoIncluir()) {
      this.telefonesUsuario = [];
      this.grupoInclusao = {};
      this.gruposVinculados = [];
      this.dataSourceGrupos.data = this.gruposVinculados;
      this.carregarGrupos();

      // Inicializa o Usuário para Inclusão
      this.usuario = {
        idTipo: TipoUsuario.SERVIDOR_INTERNO.id,
        grupos: []
      };
    }

    if (this.acaoSistema.isAcaoAlterar()) {
      this.grupoInclusao = {};
      this.carregarGrupos();
    }

    if (this.acaoSistema.isAcaoAlterar() || this.acaoSistema.isAcaoVisualizar()) {
      this.usuario = route.snapshot.data.usuario;
      this.telefonesUsuario = this.usuario.telefones;
      this.gruposVinculados = this.usuario.grupos;
      this.dataSourceGrupos.data = this.gruposVinculados;
    }
  }


  /**
   * Carrega os Grupos pelo id do Sistema.
   *
   * @param idSistema
   */
  public carregarGrupos(): void {
    this.grupoClientService.getGruposAtivos().subscribe(
      data => {
        this.grupos = data;
      },
      error => {
        this.grupos = undefined;
        if (error.code !== 'ME003') {
          this.messageService.addMsgDanger(error);
        }
      }
    );
    delete this.grupoInclusao.grupo;
  }

  /**
   * Adicionar o Grupo à lista de Grupos do Usuário.
   *
   * @param grupoInclusao
   * @param form
   * @param event
   */
  public adicionarGrupo(grupoInclusao: any, form: NgForm, event: any): void {
    form.onSubmit(event);
    this.submittedGrupo = true;

    if (form.valid) {

      // Busca o Grupo a ser adicionado na lista
      const grupoVinculado = this.gruposVinculados.find(grupo => grupo.idGrupo === grupoInclusao.grupo.id);

      // Verifica se o Grupo foi encontrado
      if (grupoVinculado === undefined) {
        this.gruposVinculados.push({
          idUsuario: this.usuario.id,
          idGrupo: grupoInclusao.grupo.id,
          nomeGrupo: grupoInclusao.grupo.nome,
          nomeSistemaGrupo: grupoInclusao.grupo.nomeSistema
        });
        this.dataSourceGrupos.data = this.gruposVinculados;
        form.onReset();
        this.grupoInclusao = {};
      } else {
        this.messageService.addMsgDanger('MSG011');
      }
    }
  }

  /**
   * Remove o Grupo da lista de grupos do Usuário.
   *
   * @param grupo
   */
  public removerGrupo(grupo: any) {
    this.messageService.addConfirmYesNo('MSG006', () => {
      const index = this.gruposVinculados.indexOf(grupo);
      this.gruposVinculados.splice(index, 1);
      this.dataSourceGrupos.data = this.gruposVinculados;
      this.messageService.addMsgSuccess('MSG007');
    });
  }

  /**
   * Salva a instância de Usuário.
   *
   * @param usuario
   * @param form
   * @param event
   */
  public salvar(usuario: any, form: NgForm, event: any) {
    form.onSubmit(event);
    this.submittedUsuario = true;

    if (form.valid) {
      if (this.gruposVinculados.length > 0) {
        usuario.grupos = this.gruposVinculados;
        usuario.telefones = this.telefonesUsuario;

        this.usuarioClientService.salvar(usuario).subscribe(() => {
          this.router.navigate(['/administracao/usuario']);
          this.messageService.addMsgSuccess('MSG007');
        }, error => {
          this.messageService.addMsgDanger(error);
        });
      } else {
        this.messageService.addMsgSuccess('MSG039');
      }
    } else {
      this.messageService.addMsgSuccess('MSG001');
    }
  }

  /**
   * Atualiza o Tipo de Usuário.
   *
   * @param event
   */
  public atualizarTipoUsuario(event: any): void {
    this.usuario.tipo = event.value;
  }

  /**
   * Altera o status do Usuário informado.
   *
   * @param usuario
   */
  public alterarStatusUsuario(usuario: any): void {
    if (!usuario.status) {
      this.inativar(usuario);
    } else {
      this.ativar(usuario);
    }
  }

  /**
   * Ativa o Usuário informado.
   *
   * @param usuario
   */
  private ativar(usuario: any): void {
    this.messageService.addConfirmYesNo('MSG034', () => {
      this.usuarioClientService.ativar(usuario.id).subscribe(() => {
        this.messageService.addMsgSuccess('MSG007');
      }, error => {
        usuario.status = false;
        this.messageService.addMsgDanger(error);
      });
    }, () => {
      usuario.status = false;
    });
  }

  /**
   * Inativa o Usuário informado.
   *
   * @param usuario
   */
  private inativar(usuario: any): void {
    this.messageService.addConfirmYesNo('MSG033', () => {
      this.usuarioClientService.inativar(usuario.id).subscribe(() => {
        this.messageService.addMsgSuccess('MSG007');
      }, error => {
        usuario.status = true;
        this.messageService.addMsgDanger(error);
      });
    }, () => {
      usuario.status = true;
    });
  }

  /**
   * Confirma o cancelamento e volta para a tela de Pesquisa.
   */
  public cancelar(): void {
    let confirmed = false;

    if (this.acaoSistema.isAcaoVisualizar()) {
      this.router.navigateByUrl('/administracao/usuario');
      confirmed = true;
    }

    if ( !confirmed ) {
      this.messageService.addConfirmYesNo('MSG010', () => {
        this.router.navigateByUrl('/administracao/usuario');
      });
    }
  }

  /**
   * Fecar o Modal de Vinculação de Usuário do AD.
   */
  public closeDialogs(): void {
    this.dialogRef.close();
  }

  /**
   * Verifica se o CPF informado é válido.
   */
  public validarCpf(): void {
    if (this.usuario.cpf === undefined || this.usuario.cpf.length !== 11) {
      delete this.usuario.cpf;
    } else {
      // Verifica se o CPF informado é válido e se está em uso
      this.usuarioClientService.validarCpf(this.usuario.cpf, this.usuario.id).subscribe(() => {}, error => {
        delete this.usuario.cpf;
        this.messageService.addMsgDanger(error);
      });
    }
  }
}

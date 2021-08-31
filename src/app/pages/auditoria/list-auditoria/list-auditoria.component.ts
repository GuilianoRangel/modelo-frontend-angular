/* tslint:disable:no-redundant-jsdoc */
import * as moment from 'moment';
import { saveAs } from 'file-saver';
import { OrderPipe } from 'ngx-order-pipe';
import { formatDate } from '@angular/common';
import { FormControl, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';

import { AuditoriaService } from '../shared/auditoria.service';
import { MessageService } from '../../../shared/message/message.service';
import { SecurityService } from '../../../shared/security/security.service';
import { FiltroAuditoriaDTO } from '../../../shared/dto/filtro-auditoria.dto';
import { AbstractComponent } from '../../../shared/component/Abstract.component';

const NOME_DOCUMENTO_EXPORTACAO = 'exportacao_log_auditoria.pdf';

/**
 * Componente de listagem de Auditoria.
 *
 * @author Guiliano Rangel (UEG)
 */
@Component({
  selector: 'app-filter-audit',
  templateUrl: './list-auditoria.component.html',
  styleUrls: ['./list-auditoria.component.scss']
})
export class ListAuditoriaComponent extends  AbstractComponent implements OnInit {

  public submitted: boolean;
  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());

  public filtroDTO: FiltroAuditoriaDTO;
  public sistemas: any[];

  public entidades: any[];

  public filtroExportar: any;
  public dataInicial: Date = null;
  public dataFinal: Date = null;
  public dataSource: MatTableDataSource<any>;

  public entidadesDisabled = true;

  public displayedColumns = ['tipoUsuario', 'loginUsuario', 'nomeUsuario', 'entidade', 'dataOperacao', 'tipoOperacao', 'acoes'];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(
    route: ActivatedRoute,
    private router: Router,
    private orderPipe: OrderPipe,
    private messageService: MessageService,
    private auditoriaService: AuditoriaService,
    public securityService: SecurityService,
  ) {
    super();
    this.sistemas = route.snapshot.data.sistemas;
    this.dataSource = new MatTableDataSource<any>();
   }

  @ViewChild('formAuditoria', { static: false }) formGrupo: NgForm;

  /**
   * Inicializa o Component.
   */
  ngOnInit() {
    this.filtroDTO = FiltroAuditoriaDTO.getInstace();
    this.dataSource.paginator = this.paginator;
  }

  search(elemento: any) {
    this.router.navigateByUrl('/administracao/audit/visualizar' , {state: {elemento}} );
  }

  /**
   * Pesquisa o grupo conforme o filtro de pesquisa informado.
   *
   * @param filtroDTO
   */
  public pesquisar(filtroDTO: FiltroAuditoriaDTO): void {
    this.dataSource = new MatTableDataSource<any>();

    if (this.validarDatas()) {
      if (this.dataInicial != null) {
        filtroDTO.dataInicial = formatDate(this.dataInicial, 'yyyy/MM/dd', 'pt-br');
      }
      if (this.dataFinal != null) {
        filtroDTO.dataFinal = formatDate(this.dataFinal, 'yyyy/MM/dd', 'pt-br');
      }

      this.auditoriaService.getByFiltro(filtroDTO).subscribe(data => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.data = data;
      }, data => {
        this.messageService.addMsgDanger(data);
        this.dataSource.data = [];
      });
    }
  }

  /**
   * Carrega a lista de Entidades de acordo com o id do Sistema.
   *
   * @param idSistema
   */
  public carregarEntidades(idSistema: any): void {
    if (idSistema) {
      this.auditoriaService.getEntidadesByIdSistema(idSistema).subscribe(
        data => {
          this.entidades = data;
          this.entidadesDisabled = false;
        },
        error => {
          this.entidades = undefined;
          this.entidadesDisabled = true;
          if (error.code !== 'ME001') {
            this.messageService.addMsgDanger(error);
          }
        }
      );
      delete this.filtroDTO.idEntidade;
    } else {
      this.entidades = undefined;
      this.entidadesDisabled = true;
      delete this.filtroDTO.idEntidade;
    }
  }

  /**
   * Limpa o filtro de pesquisa informado.
   */
  public limpar(): void {
    this.filtroDTO = FiltroAuditoriaDTO.getInstace();
    this.dataSource.data = [];
    this.dataInicial = null;
    this.dataFinal = null;
    this.entidades = undefined;
    this.entidadesDisabled = true;
  }

  /**
   * Baixa o PDF concernente a pesquisa por filtro.
   */
  public exportar(): void {
    if (this.filtroDTO) {
      this.auditoriaService.exportarByFiltro(this.filtroDTO).subscribe(data => {
        const documento = new Blob([data], {type: 'application/pdf'});
        saveAs(documento, NOME_DOCUMENTO_EXPORTACAO);
        const fileURL = URL.createObjectURL(data);
        window.open(fileURL, '_blank');
      }, error => {
        this.messageService.addMsgDanger(error);
      });
    }
  }

  /**
   * retorn se o dataSource possui dados
   */
  public isDados(): boolean {
    return this.dataSource.data.length === 0;
  }

  /**
   * Retorna a Descrição do Tipo de Usuário pelo 'id'.
   *
   * @param idTipoUsuario
   */
  public getDescricaoTipoUsuario(idTipoUsuario: string): string {
    const tipoUsuario = this.listTiposUsuarios.find(tipo => tipo.id === idTipoUsuario);
    return tipoUsuario.descricao;
  }

  /**
   * Retorna a Descrição do Tipo de Revisão pelo 'id'.
   *
   * @param idTipoRevisao
   */
  public getDescricaoTipoRevisao(idTipoRevisao: number): string {
    const tipoRevisao = this.listTiposRevisoes.find(tipo => tipo.id === idTipoRevisao);
    return tipoRevisao.descricao;
  }

  /**
   * Verifica e retorna se a Data Inicial é maior que a Data Final.
   */
  public validarDatas(): boolean {
    let valido = true;

    const dataInicial = moment(this.dataInicial);
    const dataFinal = moment(this.dataFinal);

    if (dataFinal.isBefore(dataInicial)) {
      this.messageService.addMsgDanger('MSG041');
      valido = false;
    }
    return valido;
  }
}

/* tslint:disable:no-redundant-jsdoc */
import { ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';

import { StatusAtivoInativo} from 'src/app/shared/app.constantes';
import { MessageService } from 'src/app/shared/message/message.service';
import { SecurityService } from 'src/app/shared/security/security.service';
import { GrupoClientService } from '../shared/grupo-client/grupo-client.service';
import {FiltroGrupoDTO} from '../../../shared/dto/filtro-grupo.dto';
import {AbstractComponent} from '../../../shared/component/Abstract.component';
import {ModuloClientService} from '../../../shared/services/modulo-client/modulo-client.service';

/**
 * Componente de listagem de Grupo.
 *
 * @author Guiliano Rangel (UEG)
 */
@Component({
  selector: 'app-grupo-list',
  templateUrl: './grupo-list.component.html',
  styleUrls: ['./grupo-list-component.scss']
})
export class GrupoListComponent extends  AbstractComponent implements OnInit {

  public filtroDTO: FiltroGrupoDTO;

  public dataSource: MatTableDataSource<any>;

  public modulos: any[];

  public modulosDisabled: boolean;

  public displayedColumns = ['grupo', 'status', 'acoes'];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  /**
   * Construtor da classe.
   *
   * @param route
   * @param messageService
   * @param grupoClientService
   * @param securityService
   * @param moduloService
   */
  constructor(
    route: ActivatedRoute,
    private messageService: MessageService,
    private grupoClientService: GrupoClientService, // TODO ver se vai usar mesmo
    public securityService: SecurityService,
    private moduloService: ModuloClientService
  ) {
    super();
    const grupos = route.snapshot.data.grupos;
    this.modulos = route.snapshot.data.modulos;
    this.dataSource = new MatTableDataSource<any>(grupos);
    this.initFlagStatus(this.dataSource);
    this.modulosDisabled = false;
    // TODO não remover - explicar os dois jeitos.
    // this.carregarModulos();
  }

  /**
   * Inicializa o Component.
   */
  ngOnInit() {
    this.filtroDTO = FiltroGrupoDTO.getInstace();
    this.dataSource.paginator = this.paginator;
  }

  /**
   * Inicializa a flag que identifica que a instância do grupo está 'Ativa' ou 'Inativa'.
   *
   * @param dataSource
   */
  private initFlagStatus(dataSource: MatTableDataSource<any>): void {
    this.dataSource.data.forEach(grupo => {
      grupo.ativo = this.isStatusAtivo(grupo);
    });
  }

  /**
   * Pesquisa o grupo conforme o filtro de pesquisa informado.
   *
   * @param filtroGrupoDTO
   */
  public pesquisar(filtroGrupoDTO: FiltroGrupoDTO): void {
    console.log('pesquisa-grupo:', filtroGrupoDTO);
    this.grupoClientService.getByFiltro(filtroGrupoDTO).subscribe(data => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.data = data;
      this.initFlagStatus(this.dataSource);
    }, data => {
      this.messageService.addMsgDanger(data);
      this.dataSource.data = [];
    });
  }

  /**
   * Carrega os módulos .
   *
   */
  /*public carregarModulos() {
      this.moduloService.getModulos().subscribe(
        data => {
          this.modulos = data;
          this.modulosDisabled = false;
        },
        error => {
          this.modulos = undefined;
          this.modulosDisabled = true;
          delete this.filtroDTO.idModulo;
          if (error.code !== 'ME003') {
            this.messageService.addMsgDanger(error);
          }
        }
      );
  }*/

  /**
   * Limpa o filtro de pesquisa informado.
   */
  public limpar(): void {
    this.filtroDTO = FiltroGrupoDTO.getInstace();
    this.dataSource.data = [];
  }

  /**
   * Verifica se o status do grupo informado e igual a 'Ativo'.
   *
   * @param grupo
   */
  public isStatusAtivo(grupo: any): boolean {
    return grupo.status === StatusAtivoInativo.ATIVO.id;
  }

  /**
   * Altera o status do grupo informado.
   *
   * @param grupo
   */
  public alterarStatus(grupo: any): void {
    if (grupo.status) {
      grupo.status = false;
      this.inativar(grupo);
    } else {
      grupo.status = true;
      this.ativar(grupo);
    }
  }

  /**
   * Ativa o grupo informado.
   *
   * @param grupo
   */
  private ativar(grupo: any): void {
    this.messageService.addConfirmYesNo('MSG034', () => {
      this.grupoClientService.ativar(grupo.id).subscribe(() => {
        this.pesquisar(this.filtroDTO);
        this.messageService.addMsgSuccess('MSG007');
      }, error => {
        grupo.status = false;
        this.messageService.addMsgDanger(error);
      });
    }, () => {
      grupo.status = false;
    });
  }

  /**
   * Inativa o grupo informado.
   *
   * @param grupo
   */
  private inativar(grupo: any): void {
    this.messageService.addConfirmYesNo('MSG033', () => {
      this.grupoClientService.inativar(grupo.id).subscribe(() => {
        this.pesquisar(this.filtroDTO);
        this.messageService.addMsgSuccess('MSG007');
      }, error => {
        grupo.status = true;
        this.messageService.addMsgDanger(error);
      });
    }, () => {
      grupo.status = true;
    });
  }
}

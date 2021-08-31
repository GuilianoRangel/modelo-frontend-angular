/* tslint:disable:no-redundant-jsdoc */
import {ActivatedRoute} from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {Component, OnInit, ViewChild} from '@angular/core';

import {MessageService} from 'src/app/shared/message/message.service';
import {SecurityService} from 'src/app/shared/security/security.service';
import {AbstractComponent} from '../../../shared/component/Abstract.component';
import {TipoAmigoClientService} from '../shared/tipo-amigo-client/tipo-amigo-client.service';
import {FiltroTipoAmigoDTO} from '../../../shared/dto/filtro-tipo-amigo.dto';

/**
 * Componente de listagem de Usuário.
 *
 * @author Guiliano Rangel (UEG)
 */
@Component({
  selector: 'app-tipoamigo-list',
  templateUrl: './tipo-amigo-list.component.html',
  styleUrls: ['./tipo-amigo-list-component.scss']
})
export class TipoAmigoListComponent extends AbstractComponent implements OnInit {

  public filtroDTO: FiltroTipoAmigoDTO;

  public dataSource: MatTableDataSource<any>;

  public displayedColumns = [ 'nome', 'acoes'];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  /**
   * Construtor da classe.
   *
   * @param route
   * @param messageService
   * @param securityService
   * @param tipoAmigoClientService
   */
  constructor(
    route: ActivatedRoute,
    private messageService: MessageService,
    public securityService: SecurityService,
    private tipoAmigoClientService: TipoAmigoClientService
  ) {
    super();
    const tipoamigos = route.snapshot.data.tipoamigos;
    this.dataSource = new MatTableDataSource<any>(tipoamigos);
  }

  /**
   * Inicializa o Component.
   */
  ngOnInit() {
    this.filtroDTO = FiltroTipoAmigoDTO.getInstace();
    this.dataSource.paginator = this.paginator;
  }

  /**
   * Pesquisa o Tipo Amigo conforme o filtro de pesquisa informado.
   *
   * @param filtroTipoAmigoDTO
   */
  public pesquisar(filtroTipoAmigoDTO: FiltroTipoAmigoDTO): void {
    this.tipoAmigoClientService.getByFiltro(filtroTipoAmigoDTO).subscribe(data => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.data = data;
    }, data => {
      this.messageService.addMsgDanger(data);
      this.dataSource.data = [];
    });
  }

  /**
   * Limpa o filtro de pesquisa informado.
   */
  public limpar(): void {
    this.filtroDTO = FiltroTipoAmigoDTO.getInstace();
    this.dataSource.data = [];
  }

  /**
   * Ativa o Usuário informado.
   *
   * @param usuario
   */
  private remover(usuario: any): void {
    this.messageService.addConfirmYesNo('MSG045', () => {
      this.tipoAmigoClientService.remover(usuario).subscribe(() => {
        this.filtroDTO.nome = this.filtroDTO.nome ? this.filtroDTO.nome : '%';
        this.pesquisar(this.filtroDTO);
        this.messageService.addMsgSuccess('MSG007');
      }, error => {
        usuario.status = false;
        this.messageService.addMsgDanger(error);
      });
    }, () => {
      usuario.status = false;
    });
  }

}

/* tslint:disable:no-redundant-jsdoc */
import {NgForm} from '@angular/forms';
import {Component, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {MessageService} from 'src/app/shared/message/message.service';
import {AcaoSistema} from 'src/app/shared/component/acao-sistema.acao';
import {StatusAtivoInativo} from 'src/app/shared/app.constantes';
import {GrupoClientService} from '../shared/grupo-client/grupo-client.service';
import {ModuloClientService} from '../../../shared/services/modulo-client/modulo-client.service';
import {OrderPipe} from 'ngx-order-pipe';
import {SecurityService} from '../../../shared/security/security.service';

/**
 * Componente de formulário de Grupo.
 *
 * @author Guiliano Rangel (UEG)
 */
@Component({
  selector: 'app-grupo-form',
  templateUrl: './grupo-form.component.html',
  styleUrls: ['./grupo-form.component.scss']
})
export class GrupoFormComponent {

  public submitted: boolean;

  public acaoSistema: AcaoSistema;


  public grupo: any;

  public modulos: any[];

  public modulosFiltrados: any[];

  public idsModulosVinculados: any[];

  public filtroModulo: '';
  @ViewChild('formGrupo', { static: true }) formGrupo: NgForm;

  /**
   * Construtor da classe.
   *
   * @param route
   * @param router
   * @param orderPipe
   * @param messageService
   * @param sistemaClientService
   * @param grupoClientService
   * @param moduloClientService
   * @param securityService
   */
  constructor(
    route: ActivatedRoute,
    private router: Router,
    private orderPipe: OrderPipe,
    private messageService: MessageService,
    private grupoClientService: GrupoClientService,
    private moduloClientService: ModuloClientService,
    public securityService: SecurityService
  ) {
    this.acaoSistema = new AcaoSistema(route);

    this.idsModulosVinculados = [];

    if (this.acaoSistema.isAcaoAlterar() || this.acaoSistema.isAcaoVisualizar()) {

      this.grupo = route.snapshot.data.grupo;
      this.carregarModulos();
    } else {

      this.carregarModulos();

      // Inicializa o Grupo com um Tipo de Usuário marcado.
      this.grupo = {
        status: StatusAtivoInativo.ATIVO.id,
        grupoFuncionalidades: []
      };
    }
  }

  /**
   * Cancela a ação e redireciona o fluxo para listagem de ação.
   */
  public cancelar(): void {
    let confirmed = false;

    if (this.acaoSistema.isAcaoVisualizar()) {
      this.router.navigateByUrl('/administracao/grupo');
      confirmed = true;
    }

    if ( !confirmed ) {
      this.messageService.addConfirmYesNo('MSG010', () => {
        this.router.navigateByUrl('/administracao/grupo');
      });
    }
  }

  /**
   * Carrega os módulos pelo 'id' do Sistema.
   *
   * @param idSistema
   */
  public carregarModulos() {
    this.moduloClientService.getModulos().subscribe(
      data => {
        this.modulos = data;
        this.modulos = this.orderPipe.transform(this.modulos, 'nome');
        this.modulosFiltrados = this.modulos;

        // Ordena as Funcionalidades em ordem alfabetica.
        this.modulos.forEach((item) => {
          item.funcionalidades = this.orderPipe.transform(item.funcionalidades, 'nome');
        });

        if (this.acaoSistema.isAcaoAlterar() || this.acaoSistema.isAcaoVisualizar()) {
          this.checarFuncionalidades();
        }
      },
      error => {
        this.modulos = [];
        this.grupo.funcionalidades = [];
        this.modulosFiltrados = this.modulos;

        if (error.code !== 'ME003') {
          this.messageService.addMsgDanger(error);
        }
      }
    );
    this.filtroModulo = '';
  }

  /**
   * Inclui ou altera a instância de Grupo.
   *
   * @param grupo
   * @param form
   */
  public salvar(grupo: any, form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.grupoClientService.salvar(grupo).subscribe(() => {
        this.router.navigate(['/administracao/grupo']);
        this.messageService.addMsgSuccess('MSG007');
      }, error => {
        this.messageService.addMsgDanger(error);
      });
    }
  }

  /**
   * Marca ou desmarca todas as funcionalidades de um Módulo.
   *
   * @param idModulo
   */
  public checkFuncionalidadesModulo(idModulo: any) {

    const modulo = this.modulos.find(moduloLista => moduloLista.id === idModulo);

    // Marcar todas
    if (!modulo.todosChecked) {
      for (const funcionalidade of modulo.funcionalidades) {
        if (!funcionalidade.checked) {
          funcionalidade.checked = true;
          this.atualizarFuncionalidades(modulo.id, funcionalidade, true);
        }
      }
      // Desmacar todas
    } else {
      for (const funcionalidade of modulo.funcionalidades) {
        if (funcionalidade.checked) {
          funcionalidade.checked = false;
          this.atualizarFuncionalidades(modulo.id, funcionalidade, true);
        }
      }
    }
  }

  /**
   * Atualiza a lista de Funcionalidades do Grupo, adicionando ou removendo a Funcionalidade marcada na tela.
   *
   * @param idModulo
   * @param funcionalidade
   * @param isCheckAllOperation Operação de Marcar/Desmarcar todas as funcionalidades.
   */
  public atualizarFuncionalidades(idModulo: number, funcionalidade: any, isCheckAllOperation?: any) {
    // Marca ou Desmarca o checkbox "Todos" referente ao "Módulo".
    if (!isCheckAllOperation) {
      let todosChecked = true;
      const modulo = this.modulos.find(moduloLista => moduloLista.id === idModulo);

      // Se pelo menos uma funcionalidade não estiver marcada, desmarca o checkbox "Todos" referente ao "Módulo".
      for (const funcionalidadeModulo of modulo.funcionalidades) {
        if (!funcionalidadeModulo.checked) {
          todosChecked = false;
        }
      }
      modulo.todosChecked = todosChecked;
    }
    // Pega a funcionalidade, se estiver presente na lista de funcionalidades do grupo a ser alterado.
    const grupoFuncionalidade = this.getFuncionalidade(funcionalidade);

    if (grupoFuncionalidade) {
      // Remove a funcionalidade da lista de funcionalidades do grupo a ser alterado.
      this.grupo.grupoFuncionalidades.splice(this.grupo.grupoFuncionalidades.indexOf(grupoFuncionalidade), 1);
    } else {
      // Insere a funcionalidade à lista de funcionalidades do grupo a ser alterado.
      const grupoFuncionalidadeNova = {funcionalidade};
      this.grupo.grupoFuncionalidades.push(grupoFuncionalidadeNova);
    }
  }

  /**
   * Configura as funcionalidades dos módulos carregados como checadas,
   * se encontradas na lista de funcionalidades do Grupo.
   *
   */
  private checarFuncionalidades() {
    for (const modulo of this.modulos) {
      // Marca o checkbox "Todos" do Módulo
      modulo.todosChecked = true;
      for (const funcionalidade of modulo.funcionalidades) {
        // Pega a funcionalidade, se estiver presente na lista de funcionalidades do grupo a ser alterado.
        const func = this.getFuncionalidade(funcionalidade);

        if (func) {
          funcionalidade.checked = true;
          // Guarda o id do Módulo que possui funcionalidade associada ao Grupo.
          this.guardarIdModuloVinculado(modulo.id);
        } else {
          funcionalidade.checked = false;
          // Desmarca o checkbox "Todos" do Módulo
          modulo.todosChecked = false;
        }
      }
    }
  }

  /**
   * Guarda os ids dos Módulos que possuem Funcionalidade associada ao Grupo.
   * Esta lista de ids é usada para identificar quais Módulos devem
   * ser carregados com 'accordion-group' aberto.
   *
   * @param idModulo
   */
  private guardarIdModuloVinculado(idModulo: any) {
    if (!this.idsModulosVinculados.find(idModuloVinculado => idModuloVinculado === idModulo)) {
      this.idsModulosVinculados.push(idModulo);
    }
  }

  /**
   * Retorna a funcionalidade, se estiver presente na lista de funcionalidades do grupo a ser alterado.
   *
   * @param funcionalidade
   */
  public getFuncionalidade(funcionalidade: any) {
    let func;
    if (this.grupo.grupoFuncionalidades) {
      func = this.grupo.grupoFuncionalidades.find(funcionalidadeGrupo => funcionalidadeGrupo.funcionalidade.id === funcionalidade.id);
    } else {
      // Inicializa a lista de funcionalidades se não existir.
      this.grupo.funcionalidades = [];
    }
    return func;
  }


  /**
   * Configura o atribuito 'isAccordionOpen' do Módulo
   * para mostrar o ícone '+' ou '-' no 'heading' do 'accordion-group'.
   *
   * @param event
   * @param idModulo
   */
  public abrirFecharAccordion(event: any, idModulo: any) {
    const modulo = this.modulos.find(moduloLista => moduloLista.id === idModulo);
    modulo.isAccordionOpen = event;
  }

  /**
   * Filtra os Módulos.
   *
   * @param filtro
   */
  public filtrarModulo(filtro: any) {
    if (filtro.length > 3) {
      this.modulosFiltrados = this.modulos.filter(
        moduloFiltrado => moduloFiltrado.nome.toLowerCase().includes(filtro.toLowerCase())
      );
    } else {
      this.modulosFiltrados = this.modulos;
    }
  }

  /**
   * Alterar o status do grupo em alteração.
   * @param event
   */
  public alterarStatus(event: any) {
    this.grupo.status = !this.grupo.status;
  }
}

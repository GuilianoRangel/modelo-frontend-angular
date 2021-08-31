/* tslint:disable:no-redundant-jsdoc */
import { HttpParams } from '@angular/common/http';

/**
 * Classe de trânsferencia com os parâmetros utilizados em filtros de pesquisa.
 *
 * @author Guiliano Rangel (UEG)
 */
export class FiltroGrupoDTO {

  /**
   * Construtor da classe.
   *
   * @param nome
   * @param idSistema
   * @param status
   * @param idModulo
   */
  constructor(
    public nome?: string,
    public status?: string,
    public idModulo?: string
  ) { }

  /**
   * Transforma o JSON do parâmetro em um objeto do modelo de dominio da aplicação.
   *
   * @param jsonData
   */
  static fromJson(jsonData: any): FiltroGrupoDTO {
    return Object.assign(new FiltroGrupoDTO(), jsonData);
  }

  /**
   * Retorna uma nova instancia de FiltroDTO
   */
  static getInstace(): FiltroGrupoDTO {
    return new FiltroGrupoDTO();
  }

  /**
   * Retorna a instância de HttpParams considerando os parâmetros informados.
   */
  public toParams(): HttpParams {
    let params = new HttpParams();
    if (this.status !== undefined) {
      params = params.append('idStatus', this.status ? 'A' : 'I' );
    }

    if (this.nome) {
      params = params.append('nome', this.nome);
    }

    if (this.idModulo) {
      params = params.append('idModulo', this.idModulo);
    }
    return params;
  }
}

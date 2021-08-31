/* tslint:disable:no-redundant-jsdoc */
import { HttpParams } from '@angular/common/http';

/**
 * Classe de trânsferencia com os parâmetros utilizados em filtros de pesquisa de Amigo.
 *
 * @author Guiliano Rangel (UEG)
 */
export class FiltroAmigoDTO {

  /**
   * Construtor da classe.
   *
   * @param nome
   * @param idTipoAmigo
   * @param dataAmizade
   * @param amigo
   */
  constructor(
    public nome?: string,
    public idTipoAmigo?: number,
    public dataAmizade?: string,
    public amigo?: boolean
  ) { }

  /**
   * Transforma o JSON do parâmetro em um objeto do modelo de dominio da aplicação.
   *
   * @param jsonData
   */
  static fromJson(jsonData: any): FiltroAmigoDTO {
    return Object.assign(new FiltroAmigoDTO(), jsonData);
  }

  /**
   * Retorna uma nova instancia de FiltroDTO
   */
  static getInstace(): FiltroAmigoDTO {
    return new FiltroAmigoDTO();
  }

  /**
   * Retorna a instância de HttpParams considerando os parâmetros informados.
   */
  public toParams(): HttpParams {
    let params = new HttpParams();

    if (this.nome) {
      params = params.append('nome', this.nome);
    }

    if (this.idTipoAmigo) {
      params = params.append('idTipoAmigo', String(this.idTipoAmigo) );
    }

    if (this.dataAmizade) {
      params = params.append('idStatus', this.dataAmizade );
    }

    if (this.amigo) {
      params = params.append('amigo', this.amigo ? 'true' : 'false');
    }
    return params;
  }
}

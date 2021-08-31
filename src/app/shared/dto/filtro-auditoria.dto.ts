/* tslint:disable:no-redundant-jsdoc */
import { HttpParams } from '@angular/common/http';

/**
 * Classe de trânsferencia com os parâmetros utilizados em filtros de pesquisa.
 *
 * @author Guiliano Rangel (UEG)
 */
export class FiltroAuditoriaDTO {

  /**
   * Construtor da classe.
   *
   * @param nome
   * @param idSistema
   * @param login
   * @param tipoUsuario
   * @param idEntidade
   * @param tipoOperacao
   * @param dataInicial
   * @param dataFinal
   */
  constructor(
    public nome?: string,
    public idSistema?: number,
    public login?: string,
    public tipoUsuario?: string,
    public idEntidade?: string,
    public tipoOperacao?: string,
    public dataInicial?: string,
    public dataFinal?: string
  ) { }

  /**
   * Transforma o JSON do parâmetro em um objeto do modelo de dominio da aplicação.
   *
   * @param jsonData
   */
  static fromJson(jsonData: any): FiltroAuditoriaDTO {
    return Object.assign(new FiltroAuditoriaDTO(), jsonData);
  }

  /**
   * Retorna uma nova instancia de FiltroDTO
   */
  static getInstace(): FiltroAuditoriaDTO {
    return new FiltroAuditoriaDTO();
  }

  /**
   * Retorna a instância de HttpParams considerando os parâmetros informados.
   */
  public toParams(): HttpParams {
    let params = new HttpParams();

    if (this.nome) {
      params = params.append('nome', this.nome);
    }

    if (this.login) {
      params = params.append('login', this.login);
    }

    if (this.tipoUsuario) {
      params = params.append('tipoUsuario', this.tipoUsuario);
    }

    if (this.idEntidade) {
        params = params.append('idEntidade', this.idEntidade);
    }

    if (this.tipoOperacao) {
        params = params.append('tipoOperacao', this.tipoOperacao.toString());
    }

    if (this.dataInicial) {
    params = params.append('dataInicial', this.dataInicial);
    }
    if (this.dataFinal) {
        params = params.append('dataFinal', this.dataFinal);
        }
    return params;
  }
}

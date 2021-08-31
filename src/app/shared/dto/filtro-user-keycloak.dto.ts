/* tslint:disable:no-redundant-jsdoc */
import { HttpParams } from '@angular/common/http';

/**
 * Classe de trânsferencia com os parâmetros utilizados em filtros de pesquisa de Usuário do AD.
 *
 * @author Guiliano Rangel (UEG)
 */
export class FiltroUserKeycloakDTO {

  /**
   * Construtor da classe.
   *
   * @param id
   * @param username
   * @param firstName
   * @param lastName
   * @param email
   */
  constructor(
    public id?: string,
    public username?: string,
    public firstName?: string,
    public lastName?: string,
    public email?: string
  ) { }

  /**
   * Transforma o JSON do parâmetro em um objeto do modelo de dominio da aplicação.
   *
   * @param jsonData
   */
  static fromJson(jsonData: any): FiltroUserKeycloakDTO {
    return Object.assign(new FiltroUserKeycloakDTO(), jsonData);
  }

  /**
   * Retorna uma nova instancia de FiltroDTO
   */
  static getInstace(): FiltroUserKeycloakDTO {
    return new FiltroUserKeycloakDTO();
  }

  /**
   * Retorna a instância de HttpParams considerando os parâmetros informados.
   */
  public toParams(): HttpParams {
    let params = new HttpParams();

    if (this.id) {
      params = params.append('id', this.id);
    }

    if (this.username) {
      params = params.append('username', this.username);
    }

    if (this.firstName) {
      params = params.append('firstName', this.firstName);
    }

    if (this.lastName) {
      params = params.append('lastName', this.lastName);
    }

    if (this.email) {
      params = params.append('email', this.email);
    }
    return params;
  }
}
